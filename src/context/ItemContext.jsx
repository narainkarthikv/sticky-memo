import React, { createContext, useContext, useState } from 'react';
import { ItemService } from '../services/itemService';

const ItemContext = createContext();

export function useItems() {
  return useContext(ItemContext);
}

export function ItemProvider({ children }) {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');

  const addItem = (newItem) => ItemService.addItem(setItems, newItem);
  const deleteItem = (id) => ItemService.deleteItem(setItems, id);
  const updateItem = (id, updates) => ItemService.updateItem(setItems, id, updates);
  const filteredItems = () => ItemService.filterItems(items, filter);

  const value = {
    items,
    setItems,
    filter,
    setFilter,
    addItem,
    deleteItem,
    updateItem,
    filteredItems
  };

  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
}
