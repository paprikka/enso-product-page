import type { GetServerSideProps } from "next";
import crypto from "crypto";
import { decryptToken } from "../lib/download-token";
import ErrorPage from "../components/error-page/ErrorPage";

const LATEST_JSON_URL =
  "https://downloads.enso.sonnet.io/production/install/latest.json";

function signBunnyCdnUrl(path: string, expiresAt: number): string {
  const tokenKey = process.env.BUNNY_TOKEN_KEY!;
  const hashBase = tokenKey + path + expiresAt;
  const hash = crypto
    .createHash("md5")
    .update(hashBase)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  const origin = "https://downloads.enso.sonnet.io";
  return `${origin}${path}?token=${hash}&expires=${expiresAt}`;
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const rawRef = query.ref as string | undefined;
  const email = (query.email as string) ?? "";
  let sessionId = "";

  if (rawRef) {
    const payload = decryptToken(rawRef);
    if (!payload || payload.email !== email) {
      console.warn(
        JSON.stringify({
          event: "download_token_mismatch",
          tokenEmail: payload?.email ?? null,
          queryEmail: email,
          ip: req.headers["x-forwarded-for"] ?? req.socket.remoteAddress,
          ua: req.headers["user-agent"],
          ts: new Date().toISOString(),
        })
      );
      return { props: { error: true } };
    }
    sessionId = payload.sessionId;
  }

  console.log(
    JSON.stringify({
      event: "download",
      email: email || null,
      sessionId: sessionId || null,
      ip: req.headers["x-forwarded-for"] ?? req.socket.remoteAddress,
      ua: req.headers["user-agent"],
      ts: new Date().toISOString(),
    })
  );

  try {
    const res = await fetch(LATEST_JSON_URL);
    if (!res.ok) throw new Error(`Failed to fetch latest.json: ${res.status}`);
    const latest = await res.json();
    const fileUrl = latest.file as string;
    if (!fileUrl) throw new Error("No file path in latest.json");
    const filePath = new URL(fileUrl).pathname;

    const expiresAt = Math.floor(Date.now() / 1000) + 3600; // 1 hour
    const signedUrl = signBunnyCdnUrl(filePath, expiresAt);

    return {
      redirect: {
        destination: signedUrl,
        permanent: false,
      },
    };
  } catch (err) {
    console.error(
      JSON.stringify({
        event: "download_error",
        error: String(err),
        ts: new Date().toISOString(),
      })
    );
    return { props: { error: true } };
  }
};

export default function Download() {
  return <ErrorPage />;
}
