import { cookies } from "next/headers";

const adminSessionCookieName = "admin_session";

export async function isAdminAuthenticated() {
  const expectedToken = process.env.ADMIN_ACCESS_TOKEN;

  if (!expectedToken) {
    return false;
  }

  const cookieStore = await cookies();
  return cookieStore.get(adminSessionCookieName)?.value === expectedToken;
}
