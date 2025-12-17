"use client";

import { useEffect, useState } from "react";
import type { ArticleSection } from "@/lib/types";
import {
  FormCard,
  Form,
  Field,
  Label,
  Input,
  Textarea,
  Divider,
  SectionFieldset,
  SectionLegend,
  SectionActions,
  LinkButton,
  PrimaryButton,
  Title,
} from "../styled";

export function AboutForm() {
  const [form, setForm] = useState<{
    title: string;
    coverImage: string;
    sections: ArticleSection[];
  }>({
    title: "",
    coverImage: "",
    sections: [{ image: "", subtitle: "", body: "" }],
  });

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/about");
      if (!res.ok) return;
      const data = await res.json();
      if (data) setForm(data);
    }
    load();
  }, []);

  function updateSection(i: number, key: keyof ArticleSection, value: string) {
    setForm((f) => {
      const next = [...f.sections];
      next[i] = { ...next[i], [key]: value };
      return { ...f, sections: next };
    });
  }

  function addSection() {
    setForm((f) =>
      f.sections.length >= 3
        ? f
        : { ...f, sections: [...f.sections, { image: "", subtitle: "", body: "" }] }
    );
  }

  function removeSection(i: number) {
    setForm((f) => ({
      ...f,
      sections: f.sections.filter((_, idx) => idx !== i),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    const res = await fetch("/api/admin/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);
    setStatus(res.ok ? "Saved" : "Error saving content");
  }

  return (
    <section aria-labelledby="about-title">
      <Title id="about-title">About page content</Title>

      <FormCard>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="about-title-input">Title</Label>
            <Input
              id="about-title-input"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </Field>

          <Field>
            <Label htmlFor="about-cover">Cover image URL</Label>
            <Input
              id="about-cover"
              value={form.coverImage}
              onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))}
            />
          </Field>

          <Divider />

          {form.sections.map((s, i) => (
            <SectionFieldset key={i}>
              <SectionLegend>{`Section ${i + 1}`}</SectionLegend>

              <Field>
                <Label>Image URL</Label>
                <Input
                  value={s.image}
                  onChange={(e) => updateSection(i, "image", e.target.value)}
                />
              </Field>

              <Field>
                <Label>Subtitle</Label>
                <Input
                  value={s.subtitle}
                  onChange={(e) => updateSection(i, "subtitle", e.target.value)}
                />
              </Field>

              <Field>
                <Label>Body</Label>
                <Textarea
                  rows={4}
                  value={s.body}
                  onChange={(e) => updateSection(i, "body", e.target.value)}
                />
              </Field>

              {form.sections.length > 1 && (
                <SectionActions>
                  <LinkButton type="button" onClick={() => removeSection(i)}>
                    Remove section
                  </LinkButton>
                </SectionActions>
              )}
            </SectionFieldset>
          ))}

          {form.sections.length < 3 && (
            <LinkButton type="button" onClick={addSection}>
              + Add section
            </LinkButton>
          )}

          <PrimaryButton type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save About page"}
          </PrimaryButton>

          {status && <p aria-live="polite">{status}</p>}
        </Form>
      </FormCard>
    </section>
  );
}
