// Sample Repository Interface
// This demonstrates the Repository pattern used in this template

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  name?: string;
}

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(input: CreateUserInput): Promise<User>;
  update(id: string, input: Partial<CreateUserInput>): Promise<User>;
  delete(id: string): Promise<void>;
}
