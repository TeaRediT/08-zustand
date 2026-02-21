import css from "./SearchBox.module.css";

interface SearchBoxProps {
  query: string;
  updateQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ query, updateQuery }: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={query}
      onChange={updateQuery}
    />
  );
};

export default SearchBox;
