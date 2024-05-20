import { createTheme } from '@mui/material';

export const MUITheme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#27272A',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    background: {
      paper: '#FFFFFF',
      default: '#F4F4F5',
    },
    primary: {
      main: '#A855F7',
      light: '#F3E8FF',
      dark: '#6B21A8',
    },
    secondary: {
      dark: '#A21CAF',
      main: '#E879F9',
      light: '#FAE8FF',
    },
    info: {
      main: '#38BDF8',
      light: '#E0F2FE',
      dark: '#0369A1',
    },
    success: {
      dark: '#0F766E',
      main: '#2DD4BF',
      light: '#CCFBF1',
    },
    warning: {
      dark: '#0F766E',
      main: '#F59E0B',
      light: '#FEF3C7',
    },
    error: {
      dark: '#BE123C',
      main: '#FB7185',
      light: '#FFE4E6',
    },
  },
  typography: {
    fontFamily: 'Work Sans',
    h1: {
      fontSize: '24px',
      fontWeight: 600,
    },
    h2: {
      fontSize: '22px',
    },
    h3: {
      fontSize: '20px',
    },
    h4: {
      fontSize: '18px',
    },
    h5: {
      fontSize: '16px',
    },
    h6: {
      fontSize: '14px',
    },
    subtitle1: {
      fontSize: '16px',
    },
    subtitle2: {
      fontSize: '14px',
    },
    body1: {
      fontSize: '12px',
    },
    body2: {
      fontSize: '10px',
    },
  },
});
