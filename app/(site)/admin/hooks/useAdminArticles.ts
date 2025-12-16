"use client";

import { useCallback, useState } from "react";
import type { Article } from "@/lib/types";

export function useAdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/articles");
      if (!res.ok) throw new Error("Failed to load articles");
      const data = (await res.json()) as Article[];
      setArticles(data);
    } catch (err: any) {
      setError(err?.message ?? "Could not load articles.");
    }
  }, []);

  const createArticle = useCallback(async (payload: any) => {
    const res = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Failed to create article");

    setArticles((prev) => [data, ...prev]);
    return data;
  }, []);

  const deleteArticle = useCallback(async (id: string) => {
    await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return {
    articles,
    error,
    fetchArticles,
    createArticle,
    deleteArticle,
  };
}
