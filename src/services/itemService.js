import { itemsState } from '../utils/state';

export class ItemService {
  static addItem(setItems, newItem) {
    if (!this.validateItem(newItem)) {
      return false;
    }
    
    setItems((prevItems) => [
      ...prevItems,
      { ...newItem, checked: false, held: false, all: true },
    ]);
    return true;
  }

  static deleteItem(setItems, id) {
    setItems((prevItems) => prevItems.filter((_, index) => index !== id));
  }

  static updateItem(setItems, id, updates) {
    setItems((prevItems) =>
      prevItems.map((item, index) =>
        index === id ? { ...item, ...updates } : item
      )
    );
  }

  static validateItem(item) {
    return item.title?.trim() && item.content?.trim();
  }

  static filterItems(items, filter) {
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(filter.toLowerCase()) ||
        item.content.toLowerCase().includes(filter.toLowerCase())
    );
  }
}
