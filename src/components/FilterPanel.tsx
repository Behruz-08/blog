import React from "react";
import { Select, MenuItem } from "@mui/material";

interface FilterPanelProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <Select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
      displayEmpty
      sx={{
        border: "none",
        borderBottom: "0.5px solid #000",
        borderRadius: 0,

        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
    >
      <MenuItem value="">All Categories</MenuItem>
      {categories.map((category) => (
        <MenuItem key={category} value={category}>
          {category}
        </MenuItem>
      ))}
    </Select>
  );
};

export default FilterPanel;
