import { db } from "./db/db";
import {categories} from './db/schema';



async function seed() {
  console.log("🌱 Seeding categories...");
  
  await db.insert(categories).values([
    { name: "Burger" },
    { name: "Pizza" },
    { name: "Chicken" },
    { name: "Ramen" },
  ]);

  console.log("✅ Categories seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
