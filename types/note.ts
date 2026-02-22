export interface Note {
  content: string;
  createdAt: string;
  id: string;
  tag: string;
  title: string;
  updatedAt: string;
}

export type CreateNote = Omit<Note, "id" | "createdAt" | "updatedAt">;
