# Repositories

データアクセス層（Data Access Layer）

## 責務

- データベースとの直接的なやり取り
- CRUD操作の実装
- クエリロジックの実装

## パターン

### 1. インターフェースを定義

```typescript
// interfaces/foo-repository.interface.ts
export interface IFooRepository {
  findById(id: string): Promise<Foo | null>;
  findAll(): Promise<Foo[]>;
  create(input: CreateFooInput): Promise<Foo>;
  update(id: string, input: UpdateFooInput): Promise<Foo>;
  delete(id: string): Promise<void>;
}
```

### 2. 実装を作成

```typescript
// prisma-foo.repository.ts
import type { PrismaClient } from "@prisma/client";
import type { IFooRepository } from "./interfaces/foo-repository.interface";

export class PrismaFooRepository implements IFooRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Foo | null> {
    return await this.prisma.foo.findUnique({ where: { id } });
  }
  // ...
}
```

## 利点

- テスト時にモック可能
- DB実装を差し替え可能（Prisma → Drizzle など）
- ビジネスロジックから分離
