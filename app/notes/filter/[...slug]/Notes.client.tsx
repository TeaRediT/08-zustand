"use client";

import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

interface NotesPageClientProps {
  tag: string;
}

const NotesPageClient = ({ tag }: NotesPageClientProps) => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isModal, setIsModal] = useState<boolean>(false);

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

  const handleClick = (): void => {
    setIsModal(true);
  };

  const handleClose = (): void => {
    setIsModal(false);
  };

  const updateQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setQuery(e.target.value);
      setPage(1);
    },
    300,
  );

  return (
    <>
      <div className={css.app}>
        <div className={css.toolbar}>
          <SearchBox query={query} updateQuery={updateQuery}></SearchBox>
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
            <button className={css.button} onClick={handleClick}>
              Create note +
            </button>
          }
        </div>
        {note && note.notes.length > 0 && (
          <NoteList notes={note.notes}></NoteList>
        )}
        {isModal && (
          <Modal onClose={handleClose}>
            <NoteForm onClose={handleClose}></NoteForm>
          </Modal>
        )}
      </div>
    </>
  );
};

export default NotesPageClient;
