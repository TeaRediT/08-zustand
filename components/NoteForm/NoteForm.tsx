import { useId } from "react";
import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postNote } from "@/lib/api";
import { toast, Toaster } from "react-hot-toast";

interface NoteFormProps {
  onClose: () => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string().max(500, "Content is too long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
});

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();
  const fieldId = useId();

  const handleSubmit = (values: NoteFormValues): void => {
    addMutation.mutate(values);
  };

  const addMutation = useMutation({
    mutationFn: postNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
    onError: () => {
      toast("Something went wrong");
    },
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field
              type="text"
              name="title"
              id={`${fieldId}-title`}
              className={css.input}
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field
              as="textarea"
              id={`${fieldId}-content`}
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field
              as="select"
              id={`${fieldId}-tag`}
              name="tag"
              className={css.select}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              onClick={onClose}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={false}>
              Create note
            </button>
          </div>
        </Form>
      </Formik>
      <Toaster></Toaster>
    </>
  );
};

export default NoteForm;
