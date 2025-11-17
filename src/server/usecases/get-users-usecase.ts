import type { IUserRepository, User } from "../repositories/interfaces/user-repository.interface";

export interface GetUsersResult {
  users: User[];
  total: number;
}

export class GetUsersUsecase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<GetUsersResult> {
    try {
      const users = await this.userRepository.findAll();

      return {
        users,
        total: users.length,
      };
    } catch (error) {
      throw new Error(
        `Failed to get users: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
}
