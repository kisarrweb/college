-- CreateTable
CREATE TABLE "categories" (
    "category_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "post_in_categories" (
    "post_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    CONSTRAINT "post_in_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "post_in_categories_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts" ("post_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "posts" (
    "post_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "author_id" INTEGER,
    CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "profiles" (
    "profile_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contact" TEXT,
    "adresse" TEXT,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "post_id_category_id_unique" ON "post_in_categories"("post_id", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
