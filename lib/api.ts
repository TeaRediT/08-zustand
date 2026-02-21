import axios from "axios";
import type { Note } from "@/types/note";

type CreateNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

export interface NoteList {
  notes: Note[];
  totalPages: number;
}

const options = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
};

export const fetchNotes = async (
  query: string,
  page: number,
  tag: string,
): Promise<NoteList> => {
  const { data } = await axios.get<NoteList>(
    `https://notehub-public.goit.study/api/notes`,
    {
      ...options,
      params: {
        ...(query === "" ? null : { search: query }),
        ...(tag === "all" ? null : { tag }),
        page,
        perPage: 12,
        sortBy: "created",
      },
    },
  );
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    options,
  );

  return data;
};

export const postNote = async (note: CreateNote): Promise<Note> => {
  const { data } = await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes`,
    note,
    options,
  );

  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    options,
  );

  return data;
};
