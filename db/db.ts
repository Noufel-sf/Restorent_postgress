import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Safe fallback for standalone Vercel hosting without PostgreSQL
const connectionString =
  process.env.DATABASE_URL || "postgresql://mock:mock@localhost:5432/mock";

const sql = neon(connectionString);

export const db = drizzle({ client: sql });
