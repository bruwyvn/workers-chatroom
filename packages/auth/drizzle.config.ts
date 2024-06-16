import { Config } from "drizzle-kit";

export default {
  schema: "./src/schema.ts",
  dialect: "sqlite",
} satisfies Config;
