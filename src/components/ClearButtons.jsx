import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { ShoppingListContext } from "../ShoppingListContext";

export const ClearButtons = () => {
  const { items, setItems } = useContext(ShoppingListContext);

  const handleClearAll = () => {
    setItems([]);
  };

  const handleClearCompleted = () => {
    setItems(items.filter((item) => !item.completed));
  };

  return (
    <Box className="clear-buttons">
      <Button onClick={handleClearAll} className="clear-button">
        Clear All
      </Button>
      <Button onClick={handleClearCompleted} className="clear-button">
        Clear Completed
      </Button>
    </Box>
  );
};
