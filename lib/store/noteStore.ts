import { CreateNote } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteStore {
  draft: CreateNote;
  setDraft: (note: CreateNote) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    { name: "noteDraft" },
  ),
);
