/*
  Warnings:

  - Existing timeline events are backfilled to preserve the minimal history loop.

*/
-- CreateEnum
CREATE TYPE "TimelineNodeType" AS ENUM ('MAINLINE_PROGRESS', 'BRANCH_CREATED', 'DECISION', 'EXTERNAL_EVENT', 'COMPLETED', 'INTERRUPTED');

-- AlterTable
ALTER TABLE "TimelineEvent" ADD COLUMN     "branchFromNodeId" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "impactSummary" TEXT,
ADD COLUMN     "isMainline" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "mergeToNodeId" TEXT,
ADD COLUMN     "nodeType" "TimelineNodeType" NOT NULL DEFAULT 'MAINLINE_PROGRESS',
ADD COLUMN     "parentNodeId" TEXT,
ADD COLUMN     "title" TEXT;

UPDATE "TimelineEvent"
SET
  "title" = COALESCE("payload"->>'title', "summary", 'Timeline Event'),
  "description" = COALESCE("description", "summary"),
  "impactSummary" = COALESCE(
    "impactSummary",
    CASE
      WHEN "eventType" = 'NODE_STATUS_CHANGED' THEN 'This event changed the current working status of the node.'
      ELSE 'This event updates the recent history of the space.'
    END
  );

ALTER TABLE "TimelineEvent"
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "nodeType" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "TimelineEvent_spaceId_isMainline_createdAt_idx" ON "TimelineEvent"("spaceId", "isMainline", "createdAt");
