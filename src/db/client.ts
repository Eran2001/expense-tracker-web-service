import { Pool as NeonPool } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-serverless";
import { drizzle as drizzleNode } from "drizzle-orm/node-postgres";
import { Pool as NodePool } from "pg";
import * as schema from "@/db/schema";
import { getEnv } from "@/env";

const env = getEnv();
const pool =
  env.DB_DRIVER === "neon-serverless"
    ? new NeonPool({ connectionString: env.DATABASE_URL, max: 1 })
    : new NodePool({ connectionString: env.DATABASE_URL, max: 1 });

export const db =
  env.DB_DRIVER === "neon-serverless"
    ? drizzleNeon(pool as NeonPool, { schema })
    : drizzleNode(pool as NodePool, { schema });
