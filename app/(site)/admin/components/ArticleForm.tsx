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
} from "../styled";

type Props = {
  form: {
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    sections: ArticleSection[];
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  saving: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

export function ArticleForm({ form, setForm, saving, onSubmit }: Props) {
  function updateSection(
    index: number,
    field: keyof ArticleSection,
    value: string
  ) {
    setForm((f: any) => {
      const next = [...f.sections];
      next[index] = { ...next[index], [field]: value };
      return { ...f, sections: next };
    });
  }

  function addSection() {
    setForm((f: any) =>
      f.sections.length >= 3
        ? f
        : {
            ...f,
            sections: [...f.sections, { image: "", subtitle: "", body: "" }],
          }
    );
  }

  function removeSection(index: number) {
    setForm((f: any) => ({
      ...f,
      sections: f.sections.filter((_: any, i: number) => i !== index),
    }));
  }

  return (
    <FormCard aria-label="Create new article">
      <Form onSubmit={onSubmit}>
        <Field>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm((f: any) => ({ ...f, title: e.target.value }))}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={form.slug}
            onChange={(e) => setForm((f: any) => ({ ...f, slug: e.target.value }))}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            rows={2}
            value={form.excerpt}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, excerpt: e.target.value }))
            }
          />
        </Field>

        <Field>
          <Label htmlFor="coverImage">Cover image URL</Label>
          <Input
            id="coverImage"
            value={form.coverImage}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, coverImage: e.target.value }))
            }
          />
        </Field>

        <Divider />

        {form.sections.map((s, i) => (
          <SectionFieldset key={i}>
            <SectionLegend>{`Section ${i + 1}`}</SectionLegend>

            <Field>
              <Label>Section image URL</Label>
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
              <Label>Body text</Label>
              <Textarea
                rows={4}
                value={s.body}
                onChange={(e) => updateSection(i, "body", e.target.value)}
              />
            </Field>

            <SectionActions>
              {form.sections.length > 1 && (
                <LinkButton type="button" onClick={() => removeSection(i)}>
                  Remove section
                </LinkButton>
              )}
            </SectionActions>
          </SectionFieldset>
        ))}

        <SectionActions>
          {form.sections.length < 3 && (
            <LinkButton type="button" onClick={addSection}>
              + Add section
            </LinkButton>
          )}
        </SectionActions>

        <PrimaryButton type="submit" disabled={saving}>
          {saving ? "Saving…" : "Create article"}
        </PrimaryButton>
      </Form>
    </FormCard>
  );
}
