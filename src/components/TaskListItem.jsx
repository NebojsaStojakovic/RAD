import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
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
import { ShoppingListContext } from "../ShoppingListContext";
import { ConfirmationDialog } from "./ConfirmationDialog";

export const TaskListItem = ({ item, index }) => {
  const { items, setItems } = useContext(ShoppingListContext);

  const [editIndex, setEditIndex] = useState(null);
  const [editedItem, setEditedItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  const handleOpenModal = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      setItemToDelete(null);
    }, 300);
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
              Added: {new Date(item.createdAt).toLocaleString()}
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
                onClick={() => handleEditItem(item.id)}
                className={`list-item-name ${item.completed && "completed"}`}
              >
                {item.name}
              </Typography>
            )}
            <Tooltip title="Drag to reorder" placement="top">
              <IconButton {...provided.dragHandleProps}>
                <DragIndicatorIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete item" placement="top">
              <IconButton
                onClick={() => handleOpenModal(item.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>

            {item.completed && (
              <Typography className="timestamp">
                Completed: {new Date(item.completedAt).toLocaleString()}
              </Typography>
            )}
          </ListItem>
        )}
      </Draggable>

      <ConfirmationDialog
        open={isModalOpen}
        title={`Delete ${itemNameToDelete}`}
        message={`Are you sure you want to delete "${itemNameToDelete}"? This action cannot be undone.`}
        onCancel={handleCloseModal}
        onConfirm={handleDeleteItem}
      />
    </>
  );
};
