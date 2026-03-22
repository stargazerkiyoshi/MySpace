-- CreateEnum
CREATE TYPE "NodeType" AS ENUM ('NOTE', 'TASK', 'DECISION');

-- CreateEnum
CREATE TYPE "NodeStatus" AS ENUM ('TODO', 'DOING', 'DONE');

-- AlterTable
ALTER TABLE "Node" ADD COLUMN     "nodeType" "NodeType" NOT NULL DEFAULT 'NOTE',
ADD COLUMN     "status" "NodeStatus" NOT NULL DEFAULT 'TODO';

-- CreateIndex
CREATE INDEX "Node_spaceId_updatedAt_idx" ON "Node"("spaceId", "updatedAt");
