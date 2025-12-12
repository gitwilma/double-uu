"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { Article } from "@/lib/types";

type UserWithEmail = {
  email?: string | null;
};

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const email = (session?.user as UserWithEmail | undefined)?.email ?? null;
  const isAdmin =
    status === "authenticated" &&
    !!email &&
    ADMIN_EMAIL.length > 0 &&
    email === ADMIN_EMAIL;

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/admin/articles");
        const raw = await res.text();

        if (!res.ok) {
          throw new Error("Failed to load articles");
        }

        const data = JSON.parse(raw) as Article[];
        setArticles(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Could not load articles.");
        }
      } finally {
        setLoadingArticles(false);
      }
    }

    if (isAdmin) {
      fetchArticles();
    }
  }, [isAdmin]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const raw = await res.text();

      if (!res.ok) {
        let message = "Failed to create article";
        try {
          const data = JSON.parse(raw) as { error?: string };
          if (data.error) message = data.error;
        } catch {
          // ignore
        }
        throw new Error(message);
      }

      const newArticle = JSON.parse(raw) as Article;
      setArticles((prev) => [newArticle, ...prev]);

      setForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this article?")) return;

    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      });

      const raw = await res.text();

      if (!res.ok) {
        let message = "Failed to delete";
        try {
          const data = JSON.parse(raw) as { error?: string };
          if (data.error) message = data.error;
        } catch {
          // ignore parse error
        }
        throw new Error(message);
      }

      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Could not delete article.");
      }
    }
  }

  if (status === "loading") {
    return (
      <main className="flex h-screen items-center justify-center bg-[#23062E] text-white">
        <p className="text-sm">Kontrollerar behörighet…</p>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#23062E] text-white">
        <div className="w-full max-w-md rounded-2xl bg-black/40 p-6 shadow-xl">
          <h1 className="text-xl font-semibold">Åtkomst nekad</h1>
          <p className="mt-2 text-sm text-neutral-200">
            Den här sidan är endast tillgänglig för administratören av
            magasinet.
          </p>

          <p className="mt-4 text-xs text-neutral-300">
            Om du är admin kan du logga in via <strong>Admin Login</strong> i
            footern. Annars kan du gå tillbaka till startsidan och fortsätta
            utforska magasinet.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
            >
              Till startsidan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-white">
      <h1 className="mb-4 text-2xl font-semibold">Admin – Articles</h1>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <section className="mb-10">
        <h2 className="mb-2 text-lg font-medium">Create new article</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 rounded-lg border border-white/10 p-4"
        >
          <div>
            <label className="mb-1 block text-xs">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              className="w-full rounded border border-white/10 bg-black/40 px-2 py-1 text-sm outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) =>
                setForm((f) => ({ ...f, slug: e.target.value }))
              }
              className="w-full rounded border border-white/10 bg-black/40 px-2 py-1 text-sm outline-none"
              placeholder="forsta-numret"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) =>
                setForm((f) => ({ ...f, excerpt: e.target.value }))
              }
              className="w-full rounded border border-white/10 bg-black/40 px-2 py-1 text-sm outline-none"
              rows={2}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs">Content</label>
            <textarea
              value={form.content}
              onChange={(e) =>
                setForm((f) => ({ ...f, content: e.target.value }))
              }
              className="w-full rounded border border-white/10 bg-black/40 px-2 py-1 text-sm outline-none"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs">
              Cover image URL (optional)
            </label>
            <input
              type="text"
              value={form.coverImage}
              onChange={(e) =>
                setForm((f) => ({ ...f, coverImage: e.target.value }))
              }
              className="w-full rounded border border-white/10 bg-black/40 px-2 py-1 text-sm outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded bg-white px-4 py-2 text-sm font-medium text-black disabled:opacity-60"
          >
            {saving ? "Saving…" : "Create article"}
          </button>
        </form>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-medium">Existing articles</h2>
        {loadingArticles ? (
          <p className="text-sm text-neutral-300">Loading articles…</p>
        ) : articles.length === 0 ? (
          <p className="text-sm text-neutral-300">No articles yet.</p>
        ) : (
          <ul className="space-y-3">
            {articles.map((article) => (
              <li
                key={article.id}
                className="flex items-start justify-between rounded border border-white/10 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium">{article.title}</p>
                  <p className="text-xs text-neutral-400">
                    {article.slug}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="rounded bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
