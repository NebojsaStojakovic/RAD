import AddIcon from "@mui/icons-material/Add";
import { Box, Button, TextField, Tooltip } from "@mui/material";
import React, { useContext, useState } from "react";
import { ShoppingListContext } from "../context/ShoppingListContext";

export const AddItemInput = () => {
  const { items, setItems } = useContext(ShoppingListContext);
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
        placeholder="Unesi ime stavke"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddItem();
            e.preventDefault();
          }
        }}
      />
      <Tooltip title="Dodaj" placement="top">
        <Button
          variant="contained"
          onClick={handleAddItem}
          className="add-button"
        >
          <AddIcon />
        </Button>
      </Tooltip>
    </Box>
  );
};
