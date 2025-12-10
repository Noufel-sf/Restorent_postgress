import { pgTable, text, varchar, timestamp, integer, real } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";


//
// =====================
//      CATEGORY
// =====================
//

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().notNull().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull().unique(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  foods: many(foods),
}));


//
// =====================
//        FOOD
// =====================
//

export const foods = pgTable("foods", {
  id: varchar("id").primaryKey().notNull().default(sql`gen_random_uuid()`),

  name: varchar("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  weight: varchar("weight"),
  imageUrl: varchar("image_url").notNull(),

  categoryId: varchar("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const foodsRelations = relations(foods, ({ one, many }) => ({
  category: one(categories, {
    fields: [foods.categoryId],
    references: [categories.id],
  }),
  orderItems: many(orderItems),
  cartItems: many(cartItems),
}));


//
// =====================
//        ORDER
// =====================
//

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().notNull().default(sql`gen_random_uuid()`),

  // Guest-based system
  guestId: varchar("guest_id").notNull(),
  status: varchar("status").notNull().default("pending"),
  total: real("total").notNull().default(0),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const ordersRelations = relations(orders, ({ many}) => ({
   items: many(orderItems),
}));


//
// =====================
//     ORDER ITEM
// =====================
//

export const orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey().notNull().default(sql`gen_random_uuid()`),

  orderId: varchar("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),

  foodId: varchar("food_id")
    .notNull()
    .references(() => foods.id, { onDelete: "cascade" }),

  quantity: integer("quantity").notNull().default(1),
  price: real("price").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  food: one(foods, {
    fields: [orderItems.foodId],
    references: [foods.id],
  }),
}));


//
// =====================
//         CART
// =====================
//

export const carts = pgTable("carts", {
  id: varchar("id").primaryKey().notNull().default(sql`gen_random_uuid()`),

  // Guest-specific cart
  guestId: varchar("guest_id").notNull().unique(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const cartsRelations = relations(carts, ({ many }) => ({
  items: many(cartItems),
}));


//
// =====================
//       CART ITEM
// =====================
//

export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().notNull().default(sql`gen_random_uuid()`),

  cartId: varchar("cart_id")
    .notNull()
    .references(() => carts.id, { onDelete: "cascade" }),

  foodId: varchar("food_id")
    .notNull()
    .references(() => foods.id, { onDelete: "cascade" }),

  quantity: integer("quantity").notNull().default(1),
  price: real("price").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  food: one(foods, {
    fields: [cartItems.foodId],
    references: [foods.id],
  }),
}));


export const OrderInfo = pgTable("order_info", {
  id: varchar("id").primaryKey().notNull().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").notNull(),
  fullName: varchar("full_name").notNull(),
  email: varchar("email").notNull(),
  notes: text("notes"),
  phoneNumber: varchar("phone_number").notNull(),
  address: text("address").notNull(),
  city : varchar("city").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderInfoRelations = relations(OrderInfo, ({ one }) => ({
  order: one(orders, { fields: [OrderInfo.orderId], references: [orders.id] }),
}));