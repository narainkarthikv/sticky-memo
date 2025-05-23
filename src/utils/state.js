import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

/**
 * State to manage items
 * Each item has the following structure:
 * {
 *   title: string,
 *   content: string,
 *   startDate: string | null,
 *   dueDate: string | null,
 *   checked: boolean,
 *   held: boolean
 * }
 */
export const itemsState = atom({
  key: 'itemsState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const filteredItemsState = selector({
  key: 'filteredItemsState',
  get: ({ get }) => {
    const items = get(itemsState);
    const filter = get(filterState);
    return filter ? items.filter(item => 
      item.title.toLowerCase().includes(filter.toLowerCase()) ||
      item.content.toLowerCase().includes(filter.toLowerCase())
    ) : items;
  }
});

/**
 * State to manage filter text
 */
export const filterState = atom({
  key: 'filterState',
  default: '',
});

/**
 * State to manage snackbar notifications
 */
export const snackbarState = atom({
  key: 'snackbarState',
  default: {
    open: false,
    message: '',
    severity: 'success', // Options: "success", "warning", "error", "info"
  },
  effects_UNSTABLE: [persistAtom],
});

/**
 * State to manage theme
 */
export const themeState = atom({
  key: 'themeState',
  default: 'atlassian', 
  effects_UNSTABLE: [persistAtom],
});

/**
 * State to manage theme mode (light or dark)
 */
export const themeModeState = atom({
  key: 'themeModeState',
  default: 'light',
  effects_UNSTABLE: [persistAtom],
});