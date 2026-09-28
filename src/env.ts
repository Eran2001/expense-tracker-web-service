import { z } from "zod";

const environmentSchema = z.object({
  APP_URL: z.url(),
  APP_DOMAIN: z.string().min(1),
  DATABASE_URL: z.url(),
  DB_DRIVER: z.enum(["node-postgres", "neon-serverless"]),
  SESSION_PASSWORD: z.string().min(32),
  OWNER_SETUP_TOKEN: z.string().min(1),
  CRON_SECRET: z.string().min(1),
  RESEND_API_KEY: z.string().optional(),
  BACKUP_FROM_EMAIL: z.string().optional(),
  R2_ACCOUNT_ID: z.string().optional(),
  R2_ACCESS_KEY_ID: z.string().optional(),
  R2_SECRET_ACCESS_KEY: z.string().optional(),
  R2_BUCKET: z.string().optional(),
});

export function getEnv() {
  const result = environmentSchema.safeParse(process.env);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid environment configuration: ${details}`);
  }

  return result.data;
}
