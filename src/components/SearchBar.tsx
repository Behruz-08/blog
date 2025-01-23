import { Input } from "@mui/material";
import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Input
      aria-label="Demo input"
      placeholder="Search posts…"
      onChange={handleInputChange}
      value={searchTerm}
    />
  );
};

export default SearchBar;
