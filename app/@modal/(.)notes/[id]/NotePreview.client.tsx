"use client";

import { useParams } from "next/navigation";
import css from "./NotePreview.module.css";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      {isLoading && <p>Loading, please wait...</p>}
      {error && <p>Something went wrong.</p>}
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <button onClick={handleClose} className={css.backBtn}>
                Go back
              </button>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default NotePreviewClient;
