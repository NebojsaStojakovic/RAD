import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export const ConfirmationDialog = ({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onCancel} TransitionProps={{ timeout: 0 }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Izađi
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Potvrdi
        </Button>
      </DialogActions>
    </Dialog>
  );
};
