import React, { useContext, useState } from "react";
import { Typography, Box } from "@mui/material";
import { ClearButtons } from "./components/ClearButtons";
import { SortSelect } from "./components/SortSelect";
import { FilterTabs } from "./components/FilterTabs";
import { AddItemInput } from "./components/AddItemInput";
import { TaskList } from "./components/TaskList";
import { ShoppingListContext } from "./context/ShoppingListContext";
import "./styles/styles.css";

export const App = () => {
  const { items } = useContext(ShoppingListContext);

  const [activeTab, setActiveTab] = useState("svi");

  const filteredItems =
    activeTab === "svi"
      ? items
      : activeTab === "završeni"
      ? items.filter((item) => item.completed)
      : items.filter((item) => !item.completed);

  return (
    <Box className="wrapper">
      <Typography className="title">CheckMate</Typography>

      <AddItemInput />

      <Box className="tabs-sort-wrapper">
        <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SortSelect />
      </Box>

      {filteredItems.length === 0 ? (
        <Typography className="no-items">Lista je prazna.</Typography>
      ) : (
        <>
          <TaskList filteredItems={filteredItems} />
          <ClearButtons />
        </>
      )}
    </Box>
  );
};
