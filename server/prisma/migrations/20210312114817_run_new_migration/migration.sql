-- CreateTable
CREATE TABLE "AMC" (
    "id" VARCHAR(255) NOT NULL,
    "name_th" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fund" (
    "projid" VARCHAR(255) NOT NULL,
    "symbol" TEXT NOT NULL,
    "name_th" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "amc_id" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("projid")
);

-- CreateTable
CREATE TABLE "Price" (
    "fund_id" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("fund_id")
);

-- AddForeignKey
ALTER TABLE "Fund" ADD FOREIGN KEY ("amc_id") REFERENCES "AMC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD FOREIGN KEY ("fund_id") REFERENCES "Fund"("projid") ON DELETE CASCADE ON UPDATE CASCADE;
