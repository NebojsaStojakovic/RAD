import { List } from "@mui/material";
import React, { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { TaskListItem } from "./TaskListItem";
import { ShoppingListContext } from "../context/ShoppingListContext";

export const TaskList = ({ filteredItems }) => {
  const { items, setItems } = useContext(ShoppingListContext);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="shoppingList">
        {(provided) => (
          <List
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="list"
          >
            {filteredItems.map((item, index) => (
              <TaskListItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};
