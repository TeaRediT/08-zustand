"use client";

import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";

interface NotesPageClientProps {
  tag: string;
}

const NotesPageClient = ({ tag }: NotesPageClientProps) => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes", { query, page, tag }],
    queryFn: () => fetchNotes(query, page, tag),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    throwOnError: true,
  });

  const handleUpdateQuery = useDebouncedCallback((value: string): void => {
    setQuery(value);
    setPage(1);
  }, 300);

  return (
    <>
      <div className={css.app}>
        <div className={css.toolbar}>
          <SearchBox query={query} updateQuery={handleUpdateQuery}></SearchBox>
          {isLoading && <p>Loading, please wait...</p>}
          {error && <p>Something went wrong.</p>}
          {note && note.totalPages > 1 && (
            <Pagination
              totalPages={note.totalPages}
              page={page}
              setPage={setPage}
            ></Pagination>
          )}
          {
            <Link href={"/notes/action/create"} className={css.button}>
              Create note +
            </Link>
          }
        </div>
        {note && note.notes.length > 0 && (
          <NoteList notes={note.notes}></NoteList>
        )}
      </div>
    </>
  );
};

export default NotesPageClient;
