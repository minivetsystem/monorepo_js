import { createTheme, ThemeOptions } from '@mui/material';

export const lightTheme: ThemeOptions = createTheme({
  palette: {
    background: {
      paper: '#FFFFFF',
      default: '#2f4157',
    },
    text: {
      primary: '#182C45',
      secondary: '#4F51FD',
      disabled: '#ACBEC4',
    },
    info: {
      main: '#E1F3F4',
      light: '#4F4F4F',
    },
  },
  typography: {
    fontFamily: 'Helvetica',
    h1: {
      fontSize: '44px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '32px',
      fontWeight: 700,
    },
    h3: {
      fontSize: '28px',
      fontWeight: 700,
    },
    h4: {
      fontSize: '24px',
      fontWeight: 700,
    },
    h5: {
      fontSize: '20px',
      fontWeight: 700,
    },
    body1: {
      fontSize: '18px',
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: '16px',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '14px',
      fontWeight: 400,
    },
    body2: {
      fontSize: '12px',
      fontWeight: 400,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 992,
      lg: 1200,
      xl: 1536,
    },
  },
});
