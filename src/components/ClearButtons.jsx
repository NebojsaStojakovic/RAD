import { Box, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { ShoppingListContext } from "../context/ShoppingListContext";
import { ConfirmationDialog } from "./ConfirmationDialog";

export const ClearButtons = () => {
  const { items, setItems } = useContext(ShoppingListContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);

  const openDialog = (action) => {
    setDialogAction(action);
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogAction(null);
  };

  const handleClearAll = () => {
    setItems([]);
    closeDialog();
  };

  const handleClearCompleted = () => {
    setItems(items.filter((item) => !item.completed));
    closeDialog();
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
          Obriši sve
        </Button>
        <Button
          onClick={() => openDialog("clearCompleted")}
          className="clear-button"
        >
          Obriši završene
        </Button>
      </Box>

      <ConfirmationDialog
        open={isDialogOpen}
        title={`Potvrdi brisanje svih ${
          dialogAction === "clearAll" ? "stavki" : "završenih stavki"
        }`}
        message={`Da li želite da obrišete sve ${
          dialogAction === "clearAll" ? "" : "završene"
        } stavke`}
        onCancel={closeDialog}
        onConfirm={handleConfirm}
      />
    </>
  );
};
