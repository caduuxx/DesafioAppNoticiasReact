import { useState } from "react";
import type { FormEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
      <input
        type="text"
        placeholder="Buscar notícias..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
