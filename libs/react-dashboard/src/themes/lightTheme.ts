import { createTheme, ThemeOptions } from '@mui/material';

export const lightTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#eeddf9',
      main: '#7E22CE',
      dark: '#4A1772',
    },
    info: {
      light: '#bcdeff',
      main: '#0EA5E9',
      dark: '#0882b9',
    },
    success: {
      light: '#c0eeeb',
      main: '#14B8A6',
      dark: '#019586',
    },
    error: {
      light: '#ffdce5',
      main: '#F43F5E',
      dark: '#be1631',
    },
    background: {
      paper: '#FFFFFF',
      default: '#F4F4F5',
    },
    text: {
      primary: '#52525B',
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '1.75rem',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.5rem',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.25rem',
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.125rem',
    },
    h6: {
      fontWeight: 700,
      fontSize: '24px',
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '18px',
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: '16px',
    },
    body1: {
      fontWeight: 400,
      fontSize: '14px',
    },
    body2: {
      fontWeight: 400,
      fontSize: '12px',
    },
  },
});
