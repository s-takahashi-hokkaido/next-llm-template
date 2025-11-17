"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/server/lib/prisma";
import { PrismaUserRepository } from "@/server/repositories/prisma-user.repository";

export async function createUser(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;

    // Validation
    if (!email || !email.includes("@")) {
      return { success: false, error: "Invalid email" };
    }

    // Create user via repository
    const userRepository = new PrismaUserRepository(prisma);
    const user = await userRepository.create({ email, name });

    // Revalidate the users page
    revalidatePath("/users");

    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
