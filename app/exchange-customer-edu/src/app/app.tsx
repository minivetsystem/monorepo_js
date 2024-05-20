import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '@monorepo/react-dashboard';
import { Router } from '../router/Router';
import './app.css';

export function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Router />
      {/* Nest Application Inside this */}
      {/* Nest Application Inside this */}
    </ThemeProvider>
  );
}

export default App;
