/*
Migrate legacy Post.createAt -> createdAt and remove createAt.

Run once before or after deploying the schema change:
  cd backend
  node scripts/migrate-post-createdAt.mjs

Dry run (no writes):
  node scripts/migrate-post-createdAt.mjs --dry-run
*/

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const isDryRun = process.argv.includes("--dry-run");

const migrate = async () => {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    console.error("MONGO_URI is not set");
    process.exit(1);
  }

  await mongoose.connect(mongoURI);
  const collection = mongoose.connection.collection("posts");

  const legacyPosts = await collection
    .find({ createAt: { $exists: true } })
    .toArray();

  console.log(`Found ${legacyPosts.length} post(s) with legacy createAt field`);

  if (legacyPosts.length === 0) {
    console.log("Nothing to migrate");
    await mongoose.disconnect();
    return;
  }

  let migrated = 0;

  for (const post of legacyPosts) {
    const createdAt = post.createdAt ?? post.createAt;
    const updatedAt = post.updatedAt ?? post.createAt ?? createdAt;

    if (isDryRun) {
      console.log(
        `[dry-run] ${post._id}: createAt=${post.createAt?.toISOString?.() ?? post.createAt} -> createdAt=${createdAt?.toISOString?.() ?? createdAt}`
      );
      migrated += 1;
      continue;
    }

    await collection.updateOne(
      { _id: post._id },
      {
        $set: { createdAt, updatedAt },
        $unset: { createAt: "" },
      }
    );
    migrated += 1;
  }

  console.log(
    `${isDryRun ? "Would migrate" : "Migrated"} ${migrated} post(s)`
  );

  await mongoose.disconnect();
};

migrate().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
