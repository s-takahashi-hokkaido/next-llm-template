# Next.js LLM-Friendly Template

LLM駆動開発に最適化されたNext.jsプロジェクトテンプレート

## 特徴

- ✅ **明確な4層アーキテクチャ** (app/client/server/types)
- ✅ **Repository + Usecase + Loader パターン**
- ✅ **CLAUDE.md による LLM 向け開発ガイド**
- ✅ **型安全性** (TypeScript + Zod + Prisma)
- ✅ **テスタビリティ** (インターフェース + モック対応)
- ✅ **スケーラビリティ** (ドメイン追加が容易)

## ディレクトリ構成

```
src/
├── app/                     # Next.js App Router
│   ├── page.tsx            # トップページ
│   ├── layout.tsx          # ルートレイアウト
│   └── api/                # API Routes
├── client/                  # クライアントサイド
│   ├── components/         # Reactコンポーネント
│   │   └── ui/            # 共通UIコンポーネント
│   └── lib/               # クライアント用ユーティリティ
├── server/                  # サーバーサイド
│   ├── repositories/       # データアクセス層
│   │   └── interfaces/    # リポジトリインターフェース
│   ├── usecases/          # ビジネスロジック層
│   ├── loaders/           # データ取得層（キャッシュ含む）
│   ├── actions/           # サーバーアクション（副作用処理）
│   ├── lib/               # サーバー用ユーティリティ
│   └── auth/              # 認証処理
└── types/                   # 型定義

tests/                       # テスト
├── server/
│   ├── repositories/
│   └── usecases/
└── client/
    └── components/

docs/                        # 設計ドキュメント
prisma/                      # Prismaスキーマ・マイグレーション
```

## クイックスタート

### 1. プロジェクトのセットアップ

```bash
# テンプレートから新規プロジェクト作成（degit使用）
npx degit your-username/next-llm-template my-new-project
cd my-new-project

# または、このテンプレートをクローン
git clone https://github.com/your-username/next-llm-template.git my-new-project
cd my-new-project
rm -rf .git
git init
```

### 2. 依存関係のインストール

```bash
pnpm install
```

### 3. 環境変数の設定

```bash
cp .env.example .env
```

`.env` を編集してデータベース接続情報を設定：

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

### 4. データベースのセットアップ

```bash
# マイグレーションを実行
pnpm db:migrate

# サンプルデータを投入
pnpm db:seed
```

### 5. 開発サーバーの起動

```bash
pnpm dev
```

http://localhost:3000 にアクセス

## アーキテクチャパターン

このテンプレートは、Clean Architecture / Hexagonal Architecture の原則に基づいています。

### レイヤーの依存関係

```
Page Component (app/)
    ↓
Loader (server/loaders/)          ← キャッシュ戦略 + ページ特化
    ↓
Usecase (server/usecases/)        ← ビジネスロジック
    ↓
Repository (server/repositories/) ← データアクセス
    ↓
Database (Prisma)
```

### 各レイヤーの責務

| レイヤー | 責務 | 例 |
|---------|------|-----|
| **Repository** | データベース操作 | `findById`, `create`, `update` |
| **Usecase** | ビジネスロジック | 複数リポジトリの調整、バリデーション |
| **Loader** | データ取得 + キャッシュ | `unstable_cache` でラップ |
| **Action** | 副作用処理 | フォーム送信、データ更新 + revalidate |

詳細は各ディレクトリの README.md を参照してください。

## CLAUDE.md（LLM向けガイド）

このテンプレートには `CLAUDE.md` が含まれており、LLM（Claude Code など）に開発ルールを指示できます。

主な内容：
- Next.js 実装ルール（サーバーコンポーネント優先など）
- コード構成ルール（どこに何を書くか）
- GitHub 操作ルール（PR作成フローなど）

## 開発ワークフロー

### 新機能の追加

1. **設計ドキュメント作成** (任意)
   ```bash
   # docs/YYYYMMDD_HHMM_機能名.md を作成
   ```

2. **データベーススキーマ更新** (必要に応じて)
   ```bash
   # prisma/schema.prisma を編集
   pnpm db:migrate
   ```

3. **Repository作成**
   - `src/server/repositories/interfaces/` にインターフェース
   - `src/server/repositories/` に実装

4. **Usecase作成**
   - `src/server/usecases/` にビジネスロジック

5. **Loader/Action作成**
   - データ取得: `src/server/loaders/`
   - データ更新: `src/server/actions/`

6. **ページ/コンポーネント作成**
   - `src/app/` または `src/client/components/`

7. **テスト作成**
   - `tests/` 配下に対応するテスト

### コード品質チェック

```bash
# 型チェック
pnpm typecheck

# リント
pnpm lint

# フォーマット
pnpm format

# テスト
pnpm test
```

## カスタマイズ

### 1. ドメインモデルの変更

`prisma/schema.prisma` を編集してあなたのドメインに合わせます：

```prisma
model YourModel {
  id        String   @id @default(cuid())
  // フィールドを追加
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 2. サンプルコードの削除

以下のサンプルコードを削除できます：
- `src/server/repositories/prisma-user.repository.ts`
- `src/server/usecases/get-users-usecase.ts`
- `src/server/loaders/load-users.ts`
- `src/server/actions/create-user.ts`

### 3. 認証の追加

`src/server/auth/` に認証ロジックを実装します。
推奨: NextAuth.js, Clerk, Supabase Auth など

## 利用可能なコマンド

### 開発

```bash
pnpm dev              # 開発サーバー起動
pnpm dev:setup        # 初回セットアップ（install + db:reset）
```

### ビルド

```bash
pnpm build            # 本番ビルド
pnpm start            # 本番サーバー起動
```

### コード品質

```bash
pnpm lint             # リント実行
pnpm format           # フォーマット実行
pnpm typecheck        # 型チェック実行
```

### テスト

```bash
pnpm test             # テスト実行
pnpm test:watch       # ウォッチモードでテスト
```

### データベース

```bash
pnpm db:generate      # Prisma Client 生成
pnpm db:migrate       # マイグレーション実行
pnpm db:seed          # シードデータ投入
pnpm db:reset         # データベースリセット
pnpm db:studio        # Prisma Studio 起動
```

## 技術スタック

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Database**: PostgreSQL (Prisma ORM)
- **Styling**: Tailwind CSS 4
- **Validation**: Zod
- **Testing**: Jest
- **Code Quality**: Biome
- **Package Manager**: pnpm

## 他プロジェクトへの適用

このテンプレートは以下のようなプロジェクトに適用できます：

- ✅ ECサイト
- ✅ SaaSアプリケーション
- ✅ 社内管理ツール
- ✅ ブログ・CMS
- ✅ ダッシュボード
- ✅ API + 管理画面

**ドメインが変わっても、アーキテクチャは変わりません！**

## ライセンス

MIT

## 貢献

Issue・PRを歓迎します！

## 参考

このテンプレートは以下のアーキテクチャパターンに基づいています：

- Clean Architecture (Robert C. Martin)
- Hexagonal Architecture (Alistair Cockburn)
- Domain-Driven Design (DDD)

---

**Happy LLM-Driven Development! 🚀**
