import { createCookie } from "@remix-run/node"; 

const secrets = [process.env.COOKIE_SECRET1||"default-secretkey-1",process.env.COOKIE_SECRET2||"default-secretkey-2"];

export const AdminSession = createCookie("_userDetails", {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    maxAge:  60 * 60 * 24 * 7,
    secrets: secrets,
});

export const removeAdminSession = () => {
  return AdminSession.serialize(null, {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: true,
    maxAge: 0,
  });
};