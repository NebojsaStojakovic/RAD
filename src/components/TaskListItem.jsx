import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import {
  Checkbox,
  IconButton,
  ListItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ShoppingListContext } from "../context/ShoppingListContext";
import { ConfirmationDialog } from "./ConfirmationDialog";

export const TaskListItem = ({ item, index }) => {
  const { items, setItems } = useContext(ShoppingListContext);

  const [editIndex, setEditIndex] = useState(null);
  const [editedItem, setEditedItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleOpenModal = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditItem = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setEditIndex(id);
      setEditedItem(itemToEdit.name);
    }
  };

  const handleSaveEdit = (id) => {
    if (editedItem.trim() === "") return;
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, name: editedItem.trim() } : item
    );
    setItems(updatedItems);
    setEditIndex(null);
    setEditedItem("");
  };

  const handleToggleCompleted = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            completed: !item.completed,
            completedAt: item.completed ? null : new Date().toISOString(),
          }
        : item
    );
    setItems(updatedItems);
  };

  const handleDeleteItem = () => {
    if (itemToDelete) {
      const updatedItems = items.filter((item) => item.id !== itemToDelete);
      setItems(updatedItems);
    }
    handleCloseModal();
  };

  const itemNameToDelete =
    items.find((task) => task.id === itemToDelete)?.name || "";

  return (
    <>
      <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
        {(provided) => (
          <ListItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="list-item"
          >
            <Typography className="timestamp">
              Dodato: {new Date(item.createdAt).toLocaleString()}
            </Typography>
            <Checkbox
              checked={item.completed}
              onChange={() => handleToggleCompleted(item.id)}
              color="success"
            />
            {editIndex === item.id ? (
              <TextField
                fullWidth
                variant="standard"
                value={editedItem}
                onChange={(e) => setEditedItem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit(item.id);
                }}
                onBlur={() => handleSaveEdit(item.id)}
                autoFocus
              />
            ) : (
              <Typography
                className={`list-item-name ${item.completed && "completed"}`}
              >
                {item.name}
              </Typography>
            )}

            {item.completed && (
              <Typography className="timestamp">
                Zavrseno: {new Date(item.completedAt).toLocaleString()}
              </Typography>
            )}

            <Tooltip title="Uredi" placement="top">
              <IconButton
                onClick={() => handleEditItem(item.id)}
                color="primary"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Obrisi" placement="top">
              <IconButton
                onClick={() => handleOpenModal(item.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Promenite redosled" placement="top">
              <IconButton {...provided.dragHandleProps}>
                <DragIndicatorIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        )}
      </Draggable>

      <ConfirmationDialog
        open={isModalOpen}
        title={`Obrisi ${itemNameToDelete}`}
        message={`Da li zelite da obrisete "${itemNameToDelete}"?`}
        onCancel={handleCloseModal}
        onConfirm={handleDeleteItem}
      />
    </>
  );
};
