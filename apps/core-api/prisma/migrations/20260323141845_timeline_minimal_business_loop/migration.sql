/*
  Warnings:

  - You are about to drop the column `nodeId` on the `TimelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `TimelineEvent` table. All the data in the column will be lost.
  - Added the required column `eventType` to the `TimelineEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `TimelineEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `TimelineEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetType` to the `TimelineEvent` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TimelineEventType" AS ENUM ('NODE_CREATED', 'NODE_UPDATED', 'NODE_STATUS_CHANGED');

-- CreateEnum
CREATE TYPE "TimelineTargetType" AS ENUM ('NODE');

-- DropForeignKey
ALTER TABLE "TimelineEvent" DROP CONSTRAINT "TimelineEvent_nodeId_fkey";

-- AlterTable
ALTER TABLE "TimelineEvent" DROP COLUMN "nodeId",
DROP COLUMN "type",
ADD COLUMN     "eventType" "TimelineEventType" NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL,
ADD COLUMN     "targetId" TEXT NOT NULL,
ADD COLUMN     "targetType" "TimelineTargetType" NOT NULL;

-- CreateIndex
CREATE INDEX "TimelineEvent_spaceId_createdAt_idx" ON "TimelineEvent"("spaceId", "createdAt");

-- CreateIndex
CREATE INDEX "TimelineEvent_targetType_targetId_createdAt_idx" ON "TimelineEvent"("targetType", "targetId", "createdAt");
