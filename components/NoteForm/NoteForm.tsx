import { useId } from "react";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postNote } from "@/lib/api";
import { toast, Toaster } from "react-hot-toast";
import { useNoteStore } from "@/lib/store/noteStore";

interface NoteFormProps {
  onClose: () => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();
  const fieldId = useId();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (formData: FormData): void => {
    const values: NoteFormValues = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as string,
    };

    addMutation.mutate(values);
  };

  const addMutation = useMutation({
    mutationFn: postNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
      clearDraft();
    },
    onError: () => {
      toast("Something went wrong");
    },
  });

  return (
    <>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <input
            type="text"
            name="title"
            id={`${fieldId}-title`}
            className={css.input}
            defaultValue={draft.title}
            required
            minLength={3}
            maxLength={50}
            onChange={handleChange}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <textarea
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
            defaultValue={draft.content}
            maxLength={500}
            onChange={handleChange}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <select
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
            defaultValue={draft.tag}
            required
            onChange={handleChange}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={addMutation.isPending}
          >
            Create note
          </button>
        </div>
      </form>
      <Toaster></Toaster>
    </>
  );
};

export default NoteForm;
