import { useRecoilState } from 'recoil';
import { snackbarState } from '../utils/state';

export const useNotification = () => {
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);

  const showNotification = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const hideNotification = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return {
    showNotification,
    hideNotification,
    snackbar,
  };
};
