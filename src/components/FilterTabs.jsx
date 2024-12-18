import { Box, Button } from "@mui/material";
import React from "react";

export const FilterTabs = ({ activeTab, setActiveTab }) => {
  return (
    <Box className="tabs-wrapper">
      {["svi", "nezavrseni", "zavrseni"].map((tab) => (
        <Button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`tabs ${activeTab === tab && "active"}`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </Button>
      ))}
    </Box>
  );
};
