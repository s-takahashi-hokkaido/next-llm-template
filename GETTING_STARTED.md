# Getting Started

このテンプレートを使った新規プロジェクトの立ち上げガイド

## 前提条件

- Node.js 20以上
- pnpm（推奨）または npm
- PostgreSQL（ローカルまたはクラウド）

## ステップ1: プロジェクトの作成

### 方法A: degitを使用（推奨）

```bash
# テンプレートから新規プロジェクト作成（Git履歴なし）
npx degit your-username/next-llm-template my-app
cd my-app
git init
git add .
git commit -m "Initial commit from template"
```

### 方法B: クローン

```bash
git clone https://github.com/your-username/next-llm-template.git my-app
cd my-app
rm -rf .git
git init
git add .
git commit -m "Initial commit from template"
```

## ステップ2: 依存関係のインストール

```bash
pnpm install
```

## ステップ3: 環境変数の設定

```bash
cp .env.example .env
```

`.env` を編集：

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### ローカルPostgreSQLの場合

```bash
# PostgreSQLを起動
brew services start postgresql  # macOS
sudo service postgresql start   # Linux

# データベース作成
createdb mydb
```

### Supabaseの場合

1. https://supabase.com でプロジェクト作成
2. Settings > Database > Connection string をコピー
3. `.env` の `DATABASE_URL` に設定

## ステップ4: データベースのセットアップ

```bash
# Prisma Clientを生成
pnpm db:generate

# マイグレーション実行
pnpm db:migrate

# サンプルデータ投入
pnpm db:seed
```

## ステップ5: 開発サーバー起動

```bash
pnpm dev
```

http://localhost:3000 にアクセスして、サンプルページが表示されることを確認

## ステップ6: ドメインのカスタマイズ

### 6.1 Prismaスキーマの変更

`prisma/schema.prisma` を編集して、あなたのドメインモデルに変更：

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  price       Int
  description String?
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("products")
}
```

マイグレーション実行：

```bash
pnpm db:migrate
```

### 6.2 Repository作成

```bash
# インターフェース
touch src/server/repositories/interfaces/product-repository.interface.ts

# 実装
touch src/server/repositories/prisma-product.repository.ts
```

サンプルを参考に実装：
- [user-repository.interface.ts](src/server/repositories/interfaces/user-repository.interface.ts)
- [prisma-user.repository.ts](src/server/repositories/prisma-user.repository.ts)

### 6.3 Usecase作成

```bash
touch src/server/usecases/get-products-usecase.ts
```

サンプル: [get-users-usecase.ts](src/server/usecases/get-users-usecase.ts)

### 6.4 Loader作成

```bash
touch src/server/loaders/load-products.ts
```

サンプル: [load-users.ts](src/server/loaders/load-users.ts)

### 6.5 ページ作成

```bash
mkdir -p src/app/products
touch src/app/products/page.tsx
```

Loaderを使ってデータ取得：

```tsx
import { loadProducts } from "@/server/loaders/load-products";

export default async function ProductsPage() {
  const { products } = await loadProducts();

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

## ステップ7: サンプルコードの削除

初期セットアップが完了したら、サンプルコードを削除できます：

```bash
# サンプルRepositoryの削除
rm src/server/repositories/interfaces/user-repository.interface.ts
rm src/server/repositories/prisma-user.repository.ts

# サンプルUsecaseの削除
rm src/server/usecases/get-users-usecase.ts

# サンプルLoaderの削除
rm src/server/loaders/load-users.ts

# サンプルActionの削除
rm src/server/actions/create-user.ts

# Prismaスキーマから削除
# prisma/schema.prisma の User, Post モデルを削除してマイグレーション
```

## ステップ8: Git設定

### リモートリポジトリの設定

```bash
# GitHubでリポジトリ作成後
git remote add origin https://github.com/your-username/my-app.git
git branch -M main
git push -u origin main
```

### GitHub Actionsの設定（任意）

`.github/workflows/ci.yml` を作成してCI/CDを設定

## よくある質問

### Q: データベースはPostgreSQL以外でもOK？

A: はい。Prismaは MySQL, SQLite, SQL Server などもサポートしています。
`prisma/schema.prisma` の `datasource db` を変更してください。

```prisma
datasource db {
  provider = "mysql"  // または "sqlite", "sqlserver"
  url      = env("DATABASE_URL")
}
```

### Q: npmやyarnでも使える？

A: はい。`pnpm` の代わりに `npm` や `yarn` を使用できます。

```bash
npm install
npm run dev
```

### Q: 認証を追加したい

A: `src/server/auth/` に認証ロジックを実装してください。
推奨ライブラリ:
- NextAuth.js
- Clerk
- Supabase Auth
- Auth0

### Q: LLM（Claude Code）でどう使う？

A: CLAUDE.md がプロジェクトルートにあるので、LLMが自動的に開発ルールを理解します。
例: "新しいブログ機能を追加して" → LLMが自動的にRepository/Usecase/Loaderパターンで実装

## 次のステップ

- [CLAUDE.md](CLAUDE.md) を読んで開発ルールを理解
- [アーキテクチャドキュメント](README.md#アーキテクチャパターン) を確認
- 各レイヤーのREADMEを読む：
  - [Repositories](src/server/repositories/README.md)
  - [Usecases](src/server/usecases/README.md)
  - [Loaders](src/server/loaders/README.md)
  - [Actions](src/server/actions/README.md)

Happy coding! 🚀
