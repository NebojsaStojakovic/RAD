import React, { useContext, useState } from "react";
import { Typography, Box } from "@mui/material";
import { ClearButtons } from "./components/ClearButtons";
import { SortSelect } from "./components/SortSelect";
import { FilterTabs } from "./components/FilterTabs";
import { AddItemInput } from "./components/AddItemInput";
import { TaskList } from "./components/TaskList";
import { ShoppingListContext } from "./ShoppingListContext";
import "./App.css";

export const App = () => {
  const { items } = useContext(ShoppingListContext);

  const [activeTab, setActiveTab] = useState("all");

  const filteredItems =
    activeTab === "all"
      ? items
      : activeTab === "completed"
      ? items.filter((item) => item.completed)
      : items.filter((item) => !item.completed);

  return (
    <Box className="wrapper">
      <Typography className="title">Grocery List</Typography>

      <AddItemInput />

      <Box className="tabs-sort-wrapper">
        <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SortSelect />
      </Box>

      {filteredItems.length === 0 ? (
        <Typography className="no-items">There are no items.</Typography>
      ) : (
        <>
          <TaskList filteredItems={filteredItems} />

          <ClearButtons />
        </>
      )}
    </Box>
  );
};
