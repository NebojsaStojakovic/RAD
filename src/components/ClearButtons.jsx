import { Box, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { ShoppingListContext } from "../ShoppingListContext";
import { ConfirmationDialog } from "./ConfirmationDialog";

export const ClearButtons = () => {
  const { items, setItems } = useContext(ShoppingListContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);

  const handleClearAll = () => {
    setItems([]);
    closeDialog();
  };

  const handleClearCompleted = () => {
    setItems(items.filter((item) => !item.completed));
    closeDialog();
  };

  const openDialog = (action) => {
    setDialogAction(action);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogAction(null);
  };

  const handleConfirm = () => {
    if (dialogAction === "clearAll") {
      handleClearAll();
    } else if (dialogAction === "clearCompleted") {
      handleClearCompleted();
    }
  };

  return (
    <>
      <Box className="clear-buttons">
        <Button onClick={() => openDialog("clearAll")} className="clear-button">
          Clear All
        </Button>
        <Button
          onClick={() => openDialog("clearCompleted")}
          className="clear-button"
        >
          Clear Completed
        </Button>
      </Box>

      <ConfirmationDialog
        open={isDialogOpen}
        title={
          dialogAction === "clearAll"
            ? "Confirm Clear All"
            : "Confirm Clear Completed"
        }
        message={
          dialogAction === "clearAll"
            ? "Are you sure you want to clear all items? This action cannot be undone."
            : "Are you sure you want to clear all completed items? This action cannot be undone."
        }
        onCancel={closeDialog}
        onConfirm={handleConfirm}
      />
    </>
  );
};
