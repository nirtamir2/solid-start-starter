#!/usr/bin/env node
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    select: {
      id: true,
    },
    data: {
      id: "104779123871665424046",
      isVerified: true,
      displayName: "ניר תמיר",
      picture:
        // eslint-disable-next-line no-secrets/no-secrets
        "https://lh3.googleusercontent.com/a/ALm5wu3qjFOFoqAJcLMDXHKKJf7SCwnRyKdOiCM7zCrG=s96-c",
    },
  });
}

try {
  await main();
  await prisma.$disconnect();
} catch (error) {
  console.error(error);
  try {
    await prisma.$disconnect();
  } catch (disconnectError) {
    console.error(disconnectError);
  }
  process.exit(1);
}
