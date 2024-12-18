import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ShoppingListProvider } from "./context/ShoppingListContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ShoppingListProvider>
    <App />
  </ShoppingListProvider>
);
