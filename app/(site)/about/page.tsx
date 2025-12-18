import { getAboutContent } from "@/lib/repositories/aboutRepo.mongo";
import { AboutContent } from "./AboutContent";

export default async function AboutPage() {
  const about = await getAboutContent();

  if (!about) {
    return (
      <AboutContent
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
    <AboutContent
      title={about.title}
      coverImage={about.coverImage}
      sections={about.sections}
    />
  );
}
