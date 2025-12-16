import type { Article } from "@/lib/types";
import {
  ListTitle,
  List,
  ListItem,
  ItemMain,
  ItemTitle,
  ItemMeta,
  SecondaryButton,
  DangerButton,
  EmptyState,
} from "../styled";

type Props = {
  articles: Article[];
  month: string;
  onView: (slug: string) => void;
  onDelete: (id: string) => void;
};

export function ArticleList({ articles, month, onView, onDelete }: Props) {
  return (
    <>
      <ListTitle>{`Articles (${month})`}</ListTitle>

      {articles.length === 0 ? (
        <EmptyState>No articles found for this month.</EmptyState>
      ) : (
        <List>
          {articles.map((a) => (
            <ListItem key={a.id}>
              <ItemMain>
                <ItemTitle>{a.title}</ItemTitle>
                <ItemMeta>{a.publishedAt?.slice(0, 10)}</ItemMeta>
              </ItemMain>

              <SecondaryButton type="button" onClick={() => onView(a.slug)}>
                View
              </SecondaryButton>

              <DangerButton type="button" onClick={() => onDelete(a.id)}>
                Delete
              </DangerButton>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
