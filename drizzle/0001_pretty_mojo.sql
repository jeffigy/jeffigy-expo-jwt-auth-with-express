CREATE TABLE "reservations" (
	"reservation_id" varchar(255) PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"seat_numbers" text[] NOT NULL,
	"showtime_id" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" varchar(255) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"name" varchar(255) NOT NULL,
	"picture" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"roles" text[] NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
