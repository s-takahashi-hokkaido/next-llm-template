import { loadUsers } from "@/server/loaders/load-users";
import Link from "next/link";

export default async function Home() {
  const { users, total } = await loadUsers();

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Next.js LLM-Friendly Template
        </h1>

        <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Welcome! 🎉</h2>
          <p className="mb-4">
            This is a Next.js template optimized for LLM-driven development.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Clear 4-layer architecture (app/client/server/types)</li>
            <li>Repository + Usecase + Loader patterns</li>
            <li>CLAUDE.md for LLM guidance</li>
            <li>Type-safe with TypeScript + Zod + Prisma</li>
          </ul>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Sample Users ({total})
          </h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg"
              >
                <h3 className="font-semibold">{user.name || "No name"}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user.email}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Created: {user.createdAt.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h3 className="font-semibold mb-2">Next Steps:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Read CLAUDE.md for development guidelines</li>
            <li>Customize prisma/schema.prisma for your domain</li>
            <li>Run `pnpm db:migrate` to create migrations</li>
            <li>Start building your features following the architecture!</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
