import css from "./CreateNote.module.css";
import CreateNoteClient from "./CreateNote.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a New Note | My Notes",
  description:
    "Create a new note to capture your ideas, tasks, or important information. Easily organize your thoughts with tags.",
  openGraph: {
    url: "/notes/action/create",
    title: "Create a New Note | My Notes",
    description:
      "Create a new note to capture your ideas, tasks, or important information. Easily organize your thoughts with tags.",
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

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <CreateNoteClient />
      </div>
    </main>
  );
};

export default CreateNote;
