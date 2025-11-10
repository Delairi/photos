-- CreateTable
CREATE TABLE "Folders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,

    CONSTRAINT "Folders_pkey" PRIMARY KEY ("id")
);
