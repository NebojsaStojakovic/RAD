import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  Checkbox,
  IconButton,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ShoppingListContext } from "../ShoppingListContext";

export const TaskListItem = ({ item, index }) => {
  const { items, setItems } = useContext(ShoppingListContext);

  const [editIndex, setEditIndex] = useState(null);
  const [editedItem, setEditedItem] = useState("");

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

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
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

  return (
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
          <IconButton {...provided.dragHandleProps}>
            <DragIndicatorIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteItem(item.id)} color="error">
            <DeleteIcon />
          </IconButton>

          {item.completed && (
            <Typography className="timestamp">
              Completed: {new Date(item.completedAt).toLocaleString()}
            </Typography>
          )}
        </ListItem>
      )}
    </Draggable>
  );
};
