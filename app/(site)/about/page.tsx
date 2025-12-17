import { ContentPage } from "@/app/components/content/ContentPage";
import { getAboutContent } from "@/lib/repositories/aboutRepo.mongo";

export default async function AboutPage() {
  const about = await getAboutContent();

  if (!about) {
    return (
      <ContentPage
        title="About"
        sections={[
          {
            subtitle: "Coming soon",
            body: "Content for this page has not been added yet.",
            image: "",
          },
        ]}
      />
    );
  }

  return (
    <ContentPage
      title={about.title}
      coverImage={about.coverImage}
      sections={about.sections}
    />
  );
}
