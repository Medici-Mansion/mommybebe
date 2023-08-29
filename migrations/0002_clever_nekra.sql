ALTER TABLE "category" RENAME COLUMN "image" TO "name";--> statement-breakpoint
ALTER TABLE "category" DROP CONSTRAINT "category_image_unique";--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_name_unique" UNIQUE("name");