"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { Article, ArticleSection } from "@/lib/types";

type UserWithEmail = {
  email?: string | null;
};

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);

  const [form, setForm] = useState<{
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    sections: ArticleSection[];
  }>({
    title: "",
    slug: "",
    excerpt: "",
    coverImage: "",
    sections: [{ image: "", subtitle: "", body: "" }],
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
        if (!res.ok) throw new Error("Failed to load articles");
        const data = (await res.json()) as Article[];
        setArticles(data);
      } catch (err: any) {
        setError(err.message ?? "Could not load articles.");
      }
    }

    if (isAdmin) fetchArticles();
  }, [isAdmin]);

  function updateSection(
    index: number,
    field: keyof ArticleSection,
    value: string
  ) {
    setForm((f) => {
      const next = [...f.sections];
      next[index] = { ...next[index], [field]: value };
      return { ...f, sections: next };
    });
  }

  function addSection() {
    setForm((f) =>
      f.sections.length >= 3
        ? f
        : {
            ...f,
            sections: [...f.sections, { image: "", subtitle: "", body: "" }],
          }
    );
  }

  function removeSection(index: number) {
    setForm((f) => ({
      ...f,
      sections: f.sections.filter((_, i) => i !== index),
    }));
  }

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

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create article");

      setArticles((prev) => [data, ...prev]);
      setForm({
        title: "",
        slug: "",
        excerpt: "",
        coverImage: "",
        sections: [{ image: "", subtitle: "", body: "" }],
      });
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this article?")) return;
    await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    setArticles((prev) => prev.filter((a) => a.id !== id));
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
        <button
          onClick={() => router.push("/")}
          className="rounded bg-white px-4 py-2 text-black"
        >
          Till startsidan
        </button>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-white">
      <h1 className="mb-4 text-2xl font-semibold">Admin – Articles</h1>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="mb-10 space-y-4 rounded-lg border border-white/10 p-4"
      >
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="w-full rounded bg-black/40 px-2 py-1"
          required
        />

        <input
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
          className="w-full rounded bg-black/40 px-2 py-1"
          required
        />

        <textarea
          placeholder="Excerpt"
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          className="w-full rounded bg-black/40 px-2 py-1"
          rows={2}
        />

        <input
          placeholder="Cover image URL"
          value={form.coverImage}
          onChange={(e) =>
            setForm((f) => ({ ...f, coverImage: e.target.value }))
          }
          className="w-full rounded bg-black/40 px-2 py-1"
        />

        <hr className="border-white/10" />

        {form.sections.map((s, i) => (
          <div key={i} className="space-y-2 rounded border border-white/10 p-3">
            <input
              placeholder="Section image URL"
              value={s.image}
              onChange={(e) => updateSection(i, "image", e.target.value)}
              className="w-full rounded bg-black/40 px-2 py-1"
            />
            <input
              placeholder="Subtitle"
              value={s.subtitle}
              onChange={(e) => updateSection(i, "subtitle", e.target.value)}
              className="w-full rounded bg-black/40 px-2 py-1"
            />
            <textarea
              placeholder="Body text"
              value={s.body}
              onChange={(e) => updateSection(i, "body", e.target.value)}
              rows={3}
              className="w-full rounded bg-black/40 px-2 py-1"
            />

            {form.sections.length > 1 && (
              <button
                type="button"
                onClick={() => removeSection(i)}
                className="text-xs text-red-400"
              >
                Remove section
              </button>
            )}
          </div>
        ))}

        {form.sections.length < 3 && (
          <button
            type="button"
            onClick={addSection}
            className="text-sm underline"
          >
            + Add section
          </button>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded bg-white px-4 py-2 text-black"
        >
          {saving ? "Saving…" : "Create article"}
        </button>
      </form>

      <ul className="space-y-2">
        {articles.map((a) => (
          <li
            key={a.id}
            className="flex justify-between rounded border border-white/10 px-3 py-2"
          >
            <span>{a.title}</span>
            <button
              onClick={() => handleDelete(a.id)}
              className="text-xs text-red-400"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
