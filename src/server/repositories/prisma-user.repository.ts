import type { PrismaClient } from "@prisma/client";
import type {
  IUserRepository,
  User,
  CreateUserInput,
} from "./interfaces/user-repository.interface";

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async create(input: CreateUserInput): Promise<User> {
    return await this.prisma.user.create({
      data: input,
    });
  }

  async update(id: string, input: Partial<CreateUserInput>): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: input,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
