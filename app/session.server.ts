// app/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 604_800, // One week
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    secrets: [import.meta.env.VITE_SESSION_SECRET  || "your-secret-key"],
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
