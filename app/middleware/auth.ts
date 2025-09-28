import { redirect } from "@remix-run/node";
import { AdminSession } from "~/server/cookies.server";

export async function requireAuth(request: Request) {

  const cookieHeader = request.headers.get("cookie");
  const session = await AdminSession.parse(cookieHeader);
  
  if (!session) {
    throw redirect("/login");
  }
  
  return session;
}