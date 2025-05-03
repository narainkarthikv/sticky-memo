import { atom } from 'recoil';
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
  default: localStorage.getItem('selectedTheme') || 'atlassian',
});
