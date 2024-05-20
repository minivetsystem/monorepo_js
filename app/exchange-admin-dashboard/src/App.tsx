import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { RouteManager } from './RouteManager';
import { MUITheme } from './theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={MUITheme}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <RouteManager />
        </SnackbarProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;
