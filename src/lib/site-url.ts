function withProtocol(value: string) {
  return value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`;
}

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

  if (configuredUrl) {
    return withProtocol(configuredUrl).replace(/\/$/, "");
  }

  if (vercelUrl) {
    return withProtocol(vercelUrl).replace(/\/$/, "");
  }

  return "http://localhost:3000";
}

export const siteUrl = getSiteUrl();
