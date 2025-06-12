// Common responsive breakpoints
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

// Common spacing units
export const SPACING = {
  xs: 0.5,  // 4px
  sm: 1,    // 8px
  md: 2,    // 16px
  lg: 3,    // 24px
  xl: 4,    // 32px
};

// Common component sizes
export const COMPONENT_SIZES = {
  button: {
    small: {
      width: 32,
      height: 32,
    },
    medium: {
      width: 40,
      height: 40,
    },
    large: {
      width: 48,
      height: 48,
    },
  },
  icon: {
    small: 20,
    medium: 24,
    large: 32,
  },
  input: {
    height: {
      small: 32,
      medium: 40,
      large: 48,
    },
  },
};

// Common animation durations
export const TRANSITIONS = {
  short: '0.2s',
  medium: '0.3s',
  long: '0.4s',
};

// Common z-index values
export const Z_INDEX = {
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};
