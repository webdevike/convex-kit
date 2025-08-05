import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  // Manual tables

  users: defineTable({
    name: v.string(),
    externalId: v.string(),
  }).index('by_external_id', ['externalId']),
});
