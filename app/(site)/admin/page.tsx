"use client";

import { useEffect, useState } from "react";
import type { Article } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type UserWithEmail = {
  email?: string | null;
};

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    status: "draft",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;

    const email = (session?.user as UserWithEmail | undefined)?.email;

    if (!session || !email || email !== ADMIN_EMAIL) {
      router.push("/");
    }
  }, [session, status, router]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/admin/articles");
        const raw = await res.text();

        if (!res.ok) {
          console.error("GET /api/admin/articles error:", res.status, raw);
          throw new Error("Failed to load articles");
        }

        const data = JSON.parse(raw) as Article[];
        setArticles(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err);
          setError(err.message);
        } else {
          setError("Could not load articles.");
        }
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchArticles();
    }
  }, [status]);

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

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Failed to create article");
      }

      const newArticle = (await res.json()) as Article;
      setArticles((prev) => [newArticle, ...prev]);

      setForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        status: "draft",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
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
    console.log("Deleting article with id:", id);

    const res = await fetch(`/api/admin/articles/${id}`, {
      method: "DELETE",
    });

    const raw = await res.text();
    console.log(
      "DELETE /api/admin/articles/[id] response:",
      res.status,
      raw
    );

    if (!res.ok) {
      let message = "Failed to delete";
      try {
        const data = JSON.parse(raw) as { error?: string };
        if (data.error) message = data.error;
      } catch {
      }
      throw new Error(message);
    }

    setArticles((prev) => prev.filter((a) => a.id !== id));
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      alert(err.message);
    } else {
      alert("Could not delete article.");
    }
  }
}


  if (status === "loading") {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 text-white">
        <p>Checking access…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-white">
      <h1 className="mb-4 text-2xl font-semibold">Create new article</h1>

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

          <div>
            <label className="mb-1 block text-xs">Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({ ...f, status: e.target.value }))
              }
              className="w-full rounded border border-white/10 bg-black/40 px-2 py-1 text-sm outline-none"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
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
        {loading ? (
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
                    {article.slug} · {article.status}
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
