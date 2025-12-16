"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { ArticleSection } from "@/lib/types";
import { useAdminArticles } from "./hooks/useAdminArticles";
import { monthValue, isSameMonth } from "./lib/date";
import {
  Page,
  Title,
  ErrorText,
  TopBar,
  BackButton,
} from "./styled";
import { ArticleForm } from "./components/ArticleForm";
import { MonthPicker } from "./components/MonthPicker";
import { ArticleList } from "./components/ArticleList";

type UserWithEmail = {
  email?: string | null;
};

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";

export default function AdminPageClient() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { articles, error, fetchArticles, createArticle, deleteArticle } =
    useAdminArticles();

  const [selectedMonth, setSelectedMonth] = useState(() =>
    monthValue(new Date())
  );

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    coverImage: "",
    sections: [{ image: "", subtitle: "", body: "" }] as ArticleSection[],
  });

  const [saving, setSaving] = useState(false);

  const email = (session?.user as UserWithEmail | undefined)?.email ?? null;
  const isAdmin =
    status === "authenticated" &&
    !!email &&
    ADMIN_EMAIL.length > 0 &&
    email === ADMIN_EMAIL;

  useEffect(() => {
    if (isAdmin) fetchArticles();
  }, [isAdmin, fetchArticles]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      await createArticle(form);
      setForm({
        title: "",
        slug: "",
        excerpt: "",
        coverImage: "",
        sections: [{ image: "", subtitle: "", body: "" }],
      });
    } finally {
      setSaving(false);
    }
  }

  const filteredArticles = useMemo(
    () => articles.filter((a) => isSameMonth(a.publishedAt, selectedMonth)),
    [articles, selectedMonth]
  );

  if (status === "loading") {
    return (
      <Page>
        <Title>Verifying access…</Title>
      </Page>
    );
  }

  if (!isAdmin) {
    return (
      <Page>
        <Title>Access denied</Title>
        <BackButton onClick={() => router.push("/")}>
          To home page
        </BackButton>
      </Page>
    );
  }

  return (
    <Page>
      <TopBar>
        <Title>Create new article</Title>
        <BackButton onClick={() => router.push("/")}>
          Go to home page
        </BackButton>
      </TopBar>

      {error && <ErrorText role="alert">{error}</ErrorText>}

      <ArticleForm
        form={form}
        setForm={setForm}
        saving={saving}
        onSubmit={handleSubmit}
      />

      <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />

      <ArticleList
        articles={filteredArticles}
        month={selectedMonth}
        onView={(slug) => router.push(`/articles/${slug}`)}
        onDelete={deleteArticle}
      />
    </Page>
  );
}
