import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useHandleSort } from "../hooks/useHandleSort";

export const SortSelect = () => {
  const [sortOption, setSortOption] = useState("");

  const handleSort = useHandleSort();

  return (
    <FormControl size="small" className="sort">
      <InputLabel id="sort-label">Sortiraj</InputLabel>
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
        <MenuItem value="addedAsc">Po datumu (Starije)</MenuItem>
        <MenuItem value="addedDesc">Po datumu (Novije)</MenuItem>
        <MenuItem value="completedAsc">Prvo zavrseni (Stariji)</MenuItem>
        <MenuItem value="completedDesc">Prvo zavrseni (Noviji)</MenuItem>
      </Select>
    </FormControl>
  );
};
