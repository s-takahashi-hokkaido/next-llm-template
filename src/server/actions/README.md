# Actions

サーバーアクション層（Server Actions Layer）

## 責務

- データ更新・削除などの副作用を伴う操作
- フォーム送信の処理
- キャッシュの再検証（revalidate）

## パターン

```typescript
// update-something.ts
"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/server/lib/prisma";
import { PrismaFooRepository } from "@/server/repositories/prisma-foo.repository";
import { UpdateSomethingUsecase } from "@/server/usecases/update-something-usecase";

export async function updateSomething(formData: FormData) {
  try {
    // 1. バリデーション
    const id = formData.get("id") as string;
    const value = formData.get("value") as string;

    if (!id || !value) {
      return { success: false, error: "Invalid input" };
    }

    // 2. Usecaseの実行
    const repository = new PrismaFooRepository(prisma);
    const usecase = new UpdateSomethingUsecase(repository);
    const result = await usecase.execute({ id, value });

    // 3. キャッシュの再検証（必須！）
    revalidatePath("/something");
    // または
    revalidateTag("something");

    return { success: true, result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
```

## 使い方

```typescript
// client/components/something-form.tsx
"use client";

import { updateSomething } from "@/server/actions/update-something";

export function SomethingForm() {
  return (
    <form action={updateSomething}>
      <input name="id" />
      <input name="value" />
      <button type="submit">Update</button>
    </form>
  );
}
```

## 重要なルール

- **必ず `"use server"` を先頭に記述**
- **副作用処理後は必ず `revalidatePath` または `revalidateTag` を実行**
- データ取得には使わない（loaderを使う）
