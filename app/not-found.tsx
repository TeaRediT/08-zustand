import { Metadata } from "next";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "404 - Note Not Found",
  description:
    "Oops! The page or note you are looking for doesn't exist or has been deleted.",
  openGraph: {
    title: "404 - Note Not Found",
    description:
      "Oops! The page or note you are looking for doesn't exist or has been deleted.",
    url: "/404",
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

const notFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default notFound;
