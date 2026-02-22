import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesPageClient from "./Notes.client";
import { Metadata } from "next";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: NotesPageProps): Promise<Metadata> => {
  const tag = (await params).slug[0].replace(/\b\w/g, (char) =>
    char.toUpperCase(),
  );

  return {
    title: `${tag} Notes | My Notes`,
    description: `View all your notes in the "${tag}" category.`,
    openGraph: {
      title: `${tag} Notes | My Notes`,
      description: `View all your notes in the "${tag}" category.`,
      url: `notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
};

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
