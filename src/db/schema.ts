import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  integer,
  text,
  foreignKey,
  AnyPgColumn,
  PgColumn,
  PgTableWithColumns,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").unique().notNull(),
  phone: varchar("phone").unique().notNull(),
  address1: varchar("address1").notNull(),
  address2: varchar("address2"),
  city: varchar("city").notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  zip: varchar("zip", { length: 10 }).notNull(),
  notes: text("notes"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customers.id),
  title: varchar("title").notNull(),
  description: text("description"),
  completed: boolean("completed").notNull().default(false),
  tech: varchar("tech").notNull().default("unassigned"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  titre: varchar("titre").notNull(),
  contenu: text("contenu"),
  articleId: integer("article_id").references(
    (): AnyPgColumn => articles.id
  ),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const articlesRelations = relations(
  articles,
  ({ one }) => ({
    article: one(articles, {
      fields: [articles.articleId],
      references: [articles.id],
    }),
    articles: many(articles, {
      fields: [articles.articleId],
      references: [articles.id],
    }),
  })
);

export const chapitres = pgTable(
  "chapitres",
  {
    id: serial("id").primaryKey(),
    titre: varchar("titre").notNull(),
    contenu: text("contenu"),
    childId: integer("child_id"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      parentReference: foreignKey({
        columns: [table.childId],
        foreignColumns: [table.id],
        name: "chapitres_child_id_fkey",
      }),
    };
  }
);

// Create relations
export const customersRelations = relations(customers, ({ many }) => ({
  tickets: many(tickets),
}));

export const ticketsRelations = relations(tickets, ({ one }) => ({
  customer: one(customers, {
    fields: [tickets.customerId],
    references: [customers.id],
  }),
}));
function many(articles: PgTableWithColumns<{ name: "articles"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "articles"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; hasRuntimeDefault: false; enumValues: undefined; baseColumn: never; generated: undefined; }, {}, {}>; titre: PgColumn<{ name: "titre"; tableName: "articles"; dataType: "string"; columnType: "PgVarchar"; data: string; driverParam: string; notNull: true; hasDefault: false; isPrimaryKey: false; isAutoincrement: false; hasRuntimeDefault: false; enumValues: [string, ...string[]]; baseColumn: never; generated: undefined; }, {}, {}>; contenu: PgColumn<{ name: "contenu"; tableName: "articles"; dataType: "string"; columnType: "PgText"; data: string; driverParam: string; notNull: false; hasDefault: false; isPrimaryKey: false; isAutoincrement: false; hasRuntimeDefault: false; enumValues: [string, ...string[]]; baseColumn: never; generated: undefined; }, {}, {}>; articleId: PgColumn<{ name: "article_id"; tableName: "articles"; dataType: "number"; columnType: "PgInteger"; data: number; driverParam: string | number; notNull: false; hasDefault: false; isPrimaryKey: false; isAutoincrement: false; hasRuntimeDefault: false; enumValues: undefined; baseColumn: never; generated: undefined; }, {}, {}>; createdAt: PgColumn<{ name: "created_at"; tableName: "articles"; dataType: "date"; columnType: "PgTimestamp"; data: Date; driverParam: string; notNull: true; hasDefault: true; isPrimaryKey: false; isAutoincrement: false; hasRuntimeDefault: false; enumValues: undefined; baseColumn: never; generated: undefined; }, {}, {}>; updatedAt: PgColumn<{ name: "updated_at"; tableName: "articles"; dataType: "date"; columnType: "PgTimestamp"; data: Date; driverParam: string; notNull: true; hasDefault: true; isPrimaryKey: false; isAutoincrement: false; hasRuntimeDefault: false; enumValues: undefined; baseColumn: never; generated: undefined; }, {}, {}>; }; dialect: "pg"; }>, arg1: { fields: import("drizzle-orm/pg-core").PgColumn<{ name: "article_id"; tableName: "articles"; dataType: "number"; columnType: "PgInteger"; data: number; driverParam: string | number; notNull: false; hasDefault: false; isPrimaryKey: false; isAutoincrement: false; hasRuntimeDefault: false; enumValues: undefined; baseColumn: never; generated: undefined; }, {}, {}>[]; references: import("drizzle-orm/pg-core").PgColumn<{ name: "id"; tableName: "articles"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; hasRuntimeDefault: false; enumValues: undefined; baseColumn: never; generated: undefined; }, {}, {}>[]; }): any {
  throw new Error("Function not implemented.");
}

