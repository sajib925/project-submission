import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const mentorEmail = process.env.MENTOR_EMAIL;
  const mentorPassword = process.env.MENTOR_PASSWORD;

  if (!adminEmail || !adminPassword || !mentorEmail || !mentorPassword) {
    throw new Error("ADMIN and MENTOR environment variables must be set");
  }

  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
  const hashedMentorPassword = await bcrypt.hash(mentorPassword, 10);

  // 1. Seed Admin
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "System Admin",
      email: adminEmail,
      password: hashedAdminPassword,
      role: "ADMIN",
    },
  });
  console.log(`Admin created: ${adminEmail}`);

  // 2. Seed Mentor
  await prisma.user.upsert({
    where: { email: mentorEmail },
    update: {},
    create: {
      name: "Project Mentor",
      email: mentorEmail,
      password: hashedMentorPassword,
      role: "MENTOR",
    },
  });
  console.log(`Mentor created: ${mentorEmail}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });