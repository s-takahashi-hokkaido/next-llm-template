import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
      posts: {
        create: [
          {
            title: "Hello World",
            content: "This is my first post!",
            published: true,
          },
          {
            title: "Draft Post",
            content: "This is a draft",
            published: false,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob",
      posts: {
        create: [
          {
            title: "Getting Started with Next.js",
            content: "Next.js is amazing!",
            published: true,
          },
        ],
      },
    },
  });

  console.log("✅ Seed completed!");
  console.log(`Created users: ${user1.name}, ${user2.name}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
