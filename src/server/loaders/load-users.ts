import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/server/lib/prisma";
import { PrismaUserRepository } from "@/server/repositories/prisma-user.repository";
import { GetUsersUsecase } from "@/server/usecases/get-users-usecase";

const CACHE_REVALIDATE_SECONDS = 3600; // 1 hour

export const loadUsers = () => {
  const cacheKey = ["users-list"];

  return unstable_cache(
    async () => {
      const userRepository = new PrismaUserRepository(prisma);
      const usecase = new GetUsersUsecase(userRepository);

      return await usecase.execute();
    },
    cacheKey,
    { revalidate: CACHE_REVALIDATE_SECONDS }
  )();
};
