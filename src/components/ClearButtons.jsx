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
          Obrisi sve
        </Button>
        <Button
          onClick={() => openDialog("clearCompleted")}
          className="clear-button"
        >
          Obrisi zavrsene
        </Button>
      </Box>

      <ConfirmationDialog
        open={isDialogOpen}
        title={`Potvrdi brisanje svih ${
          dialogAction === "clearAll" ? "stavki" : "zavrsenih stavki"
        }`}
        message={`Da li zelite da obrisete sve ${
          dialogAction === "clearAll" ? "" : "zavrsene"
        } stavke`}
        onCancel={closeDialog}
        onConfirm={handleConfirm}
      />
    </>
  );
};
