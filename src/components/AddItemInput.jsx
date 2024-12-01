import AddIcon from "@mui/icons-material/Add";
import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

export const AddItemInput = ({ items, setItems }) => {
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem.trim() === "") return;
    const newItemObj = {
      id: Date.now(),
      name: newItem,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setItems([...items, newItemObj]);
    setNewItem("");
  };

  return (
    <Box className="input-wrapper">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter item name"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddItem();
            e.preventDefault();
          }
        }}
      />
      <Button
        variant="contained"
        onClick={handleAddItem}
        className="add-button"
      >
        <AddIcon />
      </Button>
    </Box>
  );
};
