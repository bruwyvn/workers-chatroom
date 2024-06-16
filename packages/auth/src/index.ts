import { Hono } from "hono";
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js";
import GitHub from "@auth/core/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { drizzle } from "drizzle-orm/d1";
import { Account, User, Session, db } from "./schema";

type Bindings = {
  [key in keyof CloudflareBindings]: CloudflareBindings[key];
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "*",
  initAuthConfig((c) => ({
    secret: c.env.AUTH_SECRET,
    adapter: DrizzleAdapter(db(c.env.DB), {
      usersTable: User,
      accountsTable: Account,
      sessionsTable: Session,
    }),
    providers: [
      GitHub({
        clientId: c.env.GITHUB_ID,
        clientSecret: c.env.GITHUB_SECRET,
      }),
    ],
  })),
);

app.use("/api/auth/*", authHandler());

app.use("/api/*", verifyAuth());

export default app;
