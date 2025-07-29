ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT '{"user"}';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "active" boolean DEFAULT true NOT NULL;