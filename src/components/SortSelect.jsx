import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

export const SortSelect = ({ items, setItems }) => {
  const [sortOption, setSortOption] = useState("");

  const handleSort = (option) => {
    let sortedItems = [...items];
    switch (option) {
      case "addedAsc":
        sortedItems.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "addedDesc":
        sortedItems.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "completedAsc":
        sortedItems.sort(
          (a, b) =>
            new Date(a.completedAt || Infinity) -
            new Date(b.completedAt || Infinity)
        );
        break;
      case "completedDesc":
        sortedItems.sort(
          (a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0)
        );
        break;
      default:
        break;
    }
    setItems(sortedItems);
  };

  return (
    <FormControl size="small" className="sort">
      <InputLabel id="sort-label">Sort by</InputLabel>
      <Select
        labelId="sort-label"
        id="sort-label"
        value={sortOption}
        label="Sort by"
        onChange={(e) => {
          setSortOption(e.target.value);
          handleSort(e.target.value);
        }}
      >
        <MenuItem value="addedAsc">Date Added (Oldest)</MenuItem>
        <MenuItem value="addedDesc">Date Added (Newest)</MenuItem>
        <MenuItem value="completedAsc">Date Completed (Oldest)</MenuItem>
        <MenuItem value="completedDesc">Date Completed (Newest)</MenuItem>
      </Select>
    </FormControl>
  );
};
