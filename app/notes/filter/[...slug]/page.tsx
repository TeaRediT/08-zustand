import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesPageClient from "./Notes.client";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

const NotesPage = async ({ params }: NotesPageProps) => {
  const queryClient = new QueryClient();

  const tag = (await params).slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", { query: "", page: 1, tag }],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPageClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
