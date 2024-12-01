import React, { createContext, useState, useEffect } from "react";

export const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("shoppingList");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  return (
    <ShoppingListContext.Provider value={{ items, setItems }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
