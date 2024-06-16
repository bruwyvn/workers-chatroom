import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const Message = sqliteTable("message", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  body: text("body").notNull(),
  sentBy: text("sent_by").notNull(),
  receivedBy: text("received_by").notNull(),
});
