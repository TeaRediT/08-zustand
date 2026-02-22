import css from "./SearchBox.module.css";

interface SearchBoxProps {
  query: string;
  updateQuery: (value: string) => void;
}

const SearchBox = ({ query, updateQuery }: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={query}
      onChange={(e) => updateQuery(e.target.value)}
    />
  );
};

export default SearchBox;
