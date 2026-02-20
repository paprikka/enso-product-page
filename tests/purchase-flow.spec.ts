import { test, expect } from "@playwright/test";

test("happy path purchase flow", async ({ page }) => {
  // 1. Home page
  await page.goto("/");

  // 2. Open download modal
  await page.getByRole("button", { name: "Try it for yourself" }).click();
  await expect(page.getByText("Ensō for Mac")).toBeVisible();

  // 3. "Buy now" navigates in same tab (target="_self")
  await page.getByRole("link", { name: "Buy now" }).click();
  await page.waitForURL(/buy\.stripe\.com/, { timeout: 30_000 });

  // 4. Fill email
  await page.getByRole("textbox", { name: "Email" }).fill("test@example.com");

  // 5. Expand card payment — dispatch click to bypass the accordion overlay
  await page
    .locator('[data-testid="card-accordion-item-button"]')
    .dispatchEvent("click");

  // 6. Fill card details — inputs are direct page elements on Stripe's domain
  await page.getByPlaceholder("1234 1234 1234 1234").fill("4242424242424242");
  await page.getByPlaceholder("MM / YY").fill("04/26");
  await page.getByPlaceholder("CVC").fill("242");
  await page.getByPlaceholder("Full name on card").fill("Test User");

  // 7. Submit
  await page.locator('[data-testid="hosted-payment-submit-button"]').click();

  // 8. Wait for /payment → /thank-you redirect
  await page.waitForURL(/\/thank-you/, { timeout: 10_000 });
  await expect(page.getByRole("heading", { name: "Thank you!" })).toBeVisible();
});
