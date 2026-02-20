import { test, expect, type Page } from "@playwright/test";

async function goToStripeCheckout(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Try it for yourself" }).click();
  await expect(page.getByText("Ensō for Mac")).toBeVisible();
  await page.getByRole("link", { name: "Buy now" }).click();
  await page.waitForURL(/buy\.stripe\.com/, { timeout: 30_000 });
  await page.getByRole("textbox", { name: "Email" }).fill("test@example.com");
  await page
    .locator('[data-testid="card-accordion-item-button"]')
    .dispatchEvent("click");
}

test("happy path purchase flow", async ({ page }) => {
  await goToStripeCheckout(page);

  // Fill card details — inputs are direct page elements on Stripe's domain
  await page.getByPlaceholder("1234 1234 1234 1234").fill("4242424242424242");
  await page.getByPlaceholder("MM / YY").fill("04/26");
  await page.getByPlaceholder("CVC").fill("242");
  await page.getByPlaceholder("Full name on card").fill("Test User");

  // 7. Submit
  await page.waitForTimeout(2_000);
  await page.locator('[data-testid="hosted-payment-submit-button"]').click();

  // 8. Wait for /payment → /thank-you redirect
  await page.waitForURL(/\/thank-you/, { timeout: 10_000 });
  await expect(page.getByRole("heading", { name: "Thank you!" })).toBeVisible();

  // 9. Click download — /download signs a BunnyCDN URL and redirects to it.
  //    waitForEvent('download') only fires on a successful response, so this
  //    implicitly asserts the signed URL returned 200 (not 403/404).
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("link", { name: "Download Ensō for Mac" }).click(),
  ]);
  await download.cancel();
  expect(download.suggestedFilename()).toMatch(/\.dmg$/);
});

test("payment page shows error for missing session_id", async ({ page }) => {
  await page.goto("/payment");
  await expect(page.getByText("Something went wrong")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "get in touch" }),
  ).toHaveAttribute("href", "mailto:hello@sonnet.io");
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
  expect(page.url()).not.toMatch(/thank-you/);
});

test("payment page shows error for invalid session_id", async ({ page }) => {
  await page.goto(
    "/payment?session_id=BROKEN_cs_test_a1UQ8jb1SZ71P6N3BOAUrWc7blWpSke74YLDnOpqWXeJc7Gt4qOnxt9ZKt",
  );
  await expect(page.getByText("Something went wrong")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "get in touch" }),
  ).toHaveAttribute("href", "mailto:hello@sonnet.io");
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
  expect(page.url()).not.toMatch(/thank-you/);
});

test("thank-you page shows success with email param", async ({ page }) => {
  await page.goto("/thank-you?email=test%40example.com");
  await expect(
    page.getByRole("heading", { name: "Thank you!" }),
  ).toBeVisible();
  await expect(page.getByText("test@example.com")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Download Ensō for Mac" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});

test("thank-you page shows success with no params", async ({ page }) => {
  await page.goto("/thank-you");
  await expect(
    page.getByRole("heading", { name: "Thank you!" }),
  ).toBeVisible();
  await expect(page.getByText("Your purchase is confirmed.")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Download Ensō for Mac" }),
  ).toBeVisible();
});

test("thank-you page shows error for invalid ref", async ({ page }) => {
  await page.goto("/thank-you?ref=INVALID&email=test%40example.com");
  await expect(page.getByText("Something went wrong")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "get in touch" }),
  ).toHaveAttribute("href", "mailto:hello@sonnet.io");
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});

test("download page shows error for invalid ref", async ({ page }) => {
  await page.goto("/download?ref=INVALID&email=test%40example.com");
  await expect(page.getByText("Something went wrong")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "get in touch" }),
  ).toHaveAttribute("href", "mailto:hello@sonnet.io");
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});
