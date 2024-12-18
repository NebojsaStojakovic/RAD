import { useContext } from "react";
import { ShoppingListContext } from "../context/ShoppingListContext";

export const useHandleSort = () => {
  const { items, setItems } = useContext(ShoppingListContext);

  const handleSort = (option) => {
    let sortedItems = [...items];
    switch (option) {
      case "addedAsc":
        sortedItems.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "addedDesc":
        sortedItems.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "completedAsc":
        sortedItems.sort((a, b) => {
          if (!a.completedAt) return 1;
          if (!b.completedAt) return -1;
          return new Date(a.completedAt) - new Date(b.completedAt);
        });
        break;
      case "completedDesc":
        sortedItems.sort((a, b) => {
          if (!a.completedAt) return 1;
          if (!b.completedAt) return -1;
          return new Date(b.completedAt) - new Date(a.completedAt);
        });
        break;
      default:
        break;
    }
    setItems(sortedItems);
  };

  return handleSort;
};
