CREATE TABLE "movies" (
	"movie_id" varchar(255) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"duration" integer NOT NULL,
	"genre" text[],
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "showtimes" (
	"showtime_id" varchar(255) PRIMARY KEY NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"theater_id" varchar(255) NOT NULL,
	"movie_id" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "theaters" (
	"theater_id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"location" varchar(255) NOT NULL,
	"seat_capacity" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
