/*
  Warnings:

  - Backfills Node.orderIndex for existing rows based on createdAt ascending order within each space.
  - Graph relations move to an explicit NodeRelation table.
*/

-- AlterTable
ALTER TABLE "Node" ADD COLUMN "orderIndex" INTEGER;

WITH ordered_nodes AS (
  SELECT
    "id",
    ROW_NUMBER() OVER (
      PARTITION BY "spaceId"
      ORDER BY "createdAt" ASC, "id" ASC
    ) AS seq
  FROM "Node"
)
UPDATE "Node"
SET "orderIndex" = ordered_nodes.seq
FROM ordered_nodes
WHERE "Node"."id" = ordered_nodes."id";

ALTER TABLE "Node"
ALTER COLUMN "orderIndex" SET NOT NULL;

-- CreateTable
CREATE TABLE "NodeRelation" (
  "id" TEXT NOT NULL,
  "spaceId" TEXT NOT NULL,
  "sourceNodeId" TEXT NOT NULL,
  "targetNodeId" TEXT NOT NULL,
  "relationType" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "NodeRelation_pkey" PRIMARY KEY ("id")
);

-- DropIndex
DROP INDEX "Node_spaceId_updatedAt_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Node_spaceId_orderIndex_key" ON "Node"("spaceId", "orderIndex");

-- CreateIndex
CREATE INDEX "Node_spaceId_orderIndex_idx" ON "Node"("spaceId", "orderIndex");

-- CreateIndex
CREATE UNIQUE INDEX "NodeRelation_spaceId_sourceNodeId_targetNodeId_relationType_key"
ON "NodeRelation"("spaceId", "sourceNodeId", "targetNodeId", "relationType");

-- CreateIndex
CREATE INDEX "NodeRelation_spaceId_createdAt_idx" ON "NodeRelation"("spaceId", "createdAt");

-- AddForeignKey
ALTER TABLE "NodeRelation"
ADD CONSTRAINT "NodeRelation_spaceId_fkey"
FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NodeRelation"
ADD CONSTRAINT "NodeRelation_sourceNodeId_fkey"
FOREIGN KEY ("sourceNodeId") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NodeRelation"
ADD CONSTRAINT "NodeRelation_targetNodeId_fkey"
FOREIGN KEY ("targetNodeId") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
