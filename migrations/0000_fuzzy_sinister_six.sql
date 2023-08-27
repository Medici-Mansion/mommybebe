CREATE TABLE IF NOT EXISTS "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"image" text NOT NULL,
	CONSTRAINT "category_image_unique" UNIQUE("image")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"word" text NOT NULL,
	"original_url" text NOT NULL,
	"review_url" text,
	"category_id" text
);
