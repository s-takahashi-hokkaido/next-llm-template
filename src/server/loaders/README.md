# Loaders

データ取得層（Data Loading Layer）

## 責務

- ページやコンポーネントのためのデータ準備
- Next.jsキャッシュ戦略の実装
- Usecaseの呼び出し

## パターン

```typescript
// load-something.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/server/lib/prisma";
import { PrismaFooRepository } from "@/server/repositories/prisma-foo.repository";
import { GetSomethingUsecase } from "@/server/usecases/get-something-usecase";

const CACHE_REVALIDATE_SECONDS = 3600; // 1 hour

export const loadSomething = (params: Params) => {
  const cacheKey = ["something", JSON.stringify(params)];

  return unstable_cache(
    async () => {
      const fooRepository = new PrismaFooRepository(prisma);
      const usecase = new GetSomethingUsecase(fooRepository);

      return await usecase.execute(params);
    },
    cacheKey,
    { revalidate: CACHE_REVALIDATE_SECONDS }
  )();
};
```

## 使い方

```typescript
// app/something/page.tsx
import { loadSomething } from "@/server/loaders/load-something";

export default async function Page() {
  const data = await loadSomething({ id: "123" });
  return <div>{data.name}</div>;
}
```

## 利点

- キャッシュ戦略の一元管理
- ページ特化のデータ準備
- サーバーコンポーネントからの簡潔な呼び出し
