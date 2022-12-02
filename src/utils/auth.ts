import { createSolidAuthClient } from "@solid-auth/core";
import { createCookieSessionStorage } from "solid-start";
import { clientEnv } from "~/env/clientEnv";
import { getBaseUrl } from "~/utils/getBaseUrl";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "solid-start-starter-auth",
    secure: import.meta.env.PROD,
    secrets: [clientEnv.VITE_SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});

export const authClient = createSolidAuthClient(`${getBaseUrl()}/api/auth`);
