import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { ClearButtons } from "./components/ClearButtons";
import { SortSelect } from "./components/SortSelect";
import { FilterTabs } from "./components/FilterTabs";
import { AddItemInput } from "./components/AddItemInput";
import { TaskList } from "./components/TaskList";
import "./App.css";

export const App = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("shoppingList");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [activeTab, setActiveTab] = useState("all");

  const filteredItems =
    activeTab === "all"
      ? items
      : activeTab === "completed"
      ? items.filter((item) => item.completed)
      : items.filter((item) => !item.completed);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  return (
    <Box className="wrapper">
      <Typography className="title">Grocery List</Typography>

      <AddItemInput items={items} setItems={setItems} />

      <Box className="tabs-sort-wrapper">
        <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SortSelect items={items} setItems={setItems} />
      </Box>

      {filteredItems.length === 0 ? (
        <Typography className="no-items">There are no items.</Typography>
      ) : (
        <>
          <TaskList
            items={items}
            setItems={setItems}
            filteredItems={filteredItems}
          />

          <ClearButtons items={items} setItems={setItems} />
        </>
      )}
    </Box>
  );
};
