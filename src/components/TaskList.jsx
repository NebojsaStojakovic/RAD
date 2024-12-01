import { List } from "@mui/material";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { TaskListItem } from "./TaskListItem";

export const TaskList = ({ items, setItems, filteredItems }) => {
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
              <TaskListItem
                key={item.id}
                item={item}
                index={index}
                items={items}
                setItems={setItems}
              />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};
