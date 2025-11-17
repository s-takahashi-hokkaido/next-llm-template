# Usecases

ビジネスロジック層（Business Logic Layer）

## 責務

- アプリケーション固有のビジネスルール
- 複数のリポジトリの調整
- データ変換・加工
- エラーハンドリング

## パターン

```typescript
// do-something-usecase.ts
import type { IFooRepository } from "../repositories/interfaces/foo-repository.interface";

export interface DoSomethingParams {
  // パラメータ定義
}

export interface DoSomethingResult {
  // 結果定義
}

export class DoSomethingUsecase {
  constructor(
    private fooRepository: IFooRepository,
    private barRepository: IBarRepository
  ) {}

  async execute(params: DoSomethingParams): Promise<DoSomethingResult> {
    try {
      // 1. バリデーション
      if (!params.value) {
        throw new Error("Invalid input");
      }

      // 2. 複数リポジトリの調整
      const foo = await this.fooRepository.findById(params.id);
      const bar = await this.barRepository.findByFooId(params.id);

      // 3. ビジネスロジック
      const result = this.processData(foo, bar);

      return result;
    } catch (error) {
      // 4. エラーハンドリング
      throw new Error(`Failed: ${error.message}`);
    }
  }

  private processData(foo, bar) {
    // ビジネスロジックの実装
  }
}
```

## 利点

- ビジネスロジックの再利用
- テスタビリティ（リポジトリをモック可能）
- 保守性（ビジネスルールの変更が一箇所で済む）
