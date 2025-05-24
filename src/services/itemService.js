import { itemsState } from '../utils/state';

export class ItemService {
  static #batchTimeout = null;
  static #batchedUpdates = new Map();

  static #flushBatchedUpdates(setItems) {
    if (this.#batchedUpdates.size > 0) {
      setItems(prevItems => {
        let newItems = [...prevItems];
        for (const [id, updates] of this.#batchedUpdates.entries()) {
          if (typeof id === 'number' && id >= 0 && id < newItems.length) {
            newItems[id] = { ...newItems[id], ...updates };
          }
        }
        return newItems;
      });
      this.#batchedUpdates.clear();
    }
  }

  static async addItem(setItems, newItem) {
    if (!this.validateItem(newItem)) {
      return false;
    }
    
    return new Promise(resolve => {
      setItems(prevItems => {
        const newState = [
          ...prevItems,
          { ...newItem, checked: false, held: false, all: true },
        ];
        resolve(true);
        return newState;
      });
    });
  }

  static async deleteItem(setItems, id) {
    return new Promise((resolve, reject) => {
      if (typeof id !== 'number') {
        reject(new Error('Invalid item ID'));
        return;
      }
      
      setItems(prevItems => {
        if (id < 0 || id >= prevItems.length) {
          resolve(prevItems);
          return prevItems;
        }
        const newState = prevItems.filter((_, index) => index !== id);
        resolve(newState);
        return newState;
      });
    });
  }

  static async updateItem(setItems, id, updates) {
    // Add update to batch
    this.#batchedUpdates.set(id, {
      ...(this.#batchedUpdates.get(id) || {}),
      ...updates
    });

    // Clear existing timeout if any
    if (this.#batchTimeout) {
      clearTimeout(this.#batchTimeout);
    }

    // Schedule new batch update
    return new Promise(resolve => {
      this.#batchTimeout = setTimeout(() => {
        this.#flushBatchedUpdates(setItems);
        resolve();
      }, 100); // Batch updates within 100ms
    });
  }

  static validateItem(item) {
    return item.title?.trim() && item.content?.trim();
  }

  static filterItems(items, filter) {
    if (!filter) return items;
    const filterLower = filter.toLowerCase();
    return items.filter(
      (item) =>
        (item.title?.toLowerCase()?.includes(filterLower) || false) ||
        (item.content?.toLowerCase()?.includes(filterLower) || false)
    );
  }
}
