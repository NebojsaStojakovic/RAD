import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"; // Import drag icon
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

export const App = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("shoppingList");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [newItem, setNewItem] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedItem, setEditedItem] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredItems =
    activeTab === "all"
      ? items
      : activeTab === "completed"
      ? items.filter((item) => item.completed)
      : items.filter((item) => !item.completed);

  const handleAddItem = () => {
    if (newItem.trim() === "") return;
    const newItemObj = {
      id: Date.now(), // Generate a unique ID using the current timestamp
      name: newItem,
      completed: false,
    };
    setItems([...items, newItemObj]);
    setNewItem("");
  };

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleToggleCompleted = (id) => {
    // Update the item based on its unique id
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  };

  const handleClearAll = () => {
    setItems([]);
  };

  const handleClearCompleted = () => {
    setItems(items.filter((item) => !item.completed));
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

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  return (
    <Box p={3} maxWidth={600} margin="0 auto">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        fontWeight="bold"
        mb={3}
      >
        Shopping List
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mb={3}>
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
        <Button variant="contained" color="success" onClick={handleAddItem}>
          +
        </Button>
      </Box>

      <Box display="flex" gap={2} mb={3}>
        {["all", "incomplete", "completed"].map((tab) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            sx={{
              backgroundColor: activeTab === tab ? "black" : "#d3d3d3",
              color: activeTab === tab ? "white" : "black",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </Box>

      {filteredItems.length === 0 ? (
        <Typography align="center" color="textSecondary">
          There are no items.
        </Typography>
      ) : (
        <>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="shoppingList">
              {(provided) => (
                <List {...provided.droppableProps} ref={provided.innerRef}>
                  {filteredItems.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          sx={{
                            backgroundColor: "white",
                            border: "1px solid #d3d3d3",
                            borderRadius: "4px",
                            mb: 1,
                          }}
                        >
                          <Box display="flex" alignItems="center" width="100%">
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
                                  if (e.key === "Enter")
                                    handleSaveEdit(item.id);
                                }}
                                onBlur={() => handleSaveEdit(item.id)}
                                autoFocus
                              />
                            ) : (
                              <Typography
                                variant="body1"
                                onClick={() => handleEditItem(item.id)}
                                style={{
                                  textDecoration: item.completed
                                    ? "line-through"
                                    : "none",
                                  flex: 1,
                                  cursor: "pointer",
                                }}
                              >
                                {item.name}
                              </Typography>
                            )}
                            <IconButton
                              {...provided.dragHandleProps} // Add dragHandleProps to the icon
                              sx={{ marginLeft: "auto" }} // Optional, for styling
                            >
                              <DragIndicatorIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteItem(item.id)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>

          <Box mt={2} display="flex" gap={1}>
            <Button
              sx={{
                color: "#555",
                fontSize: "12px",
                "&:hover": { color: "black" },
              }}
              onClick={handleClearAll}
            >
              Clear All
            </Button>
            <Button
              sx={{
                color: "#555",
                fontSize: "12px",
                "&:hover": { color: "black" },
              }}
              onClick={handleClearCompleted}
            >
              Clear Completed
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
