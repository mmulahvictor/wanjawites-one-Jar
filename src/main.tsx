import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter} from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Normalize direct clean-path URLs (e.g. /poetry or /writing/slug) to hash routes
// so static hosts and reopened browser tabs always resolve without 404 errors.
if (
  typeof window !== 'undefined' &&
  window.location.pathname &&
  window.location.pathname !== '/' &&
  !window.location.hash.startsWith('#/')
) {
  const cleanPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const targetHash = `#${cleanPath}${window.location.search}`;
  window.history.replaceState(null, '', `/${targetHash}`);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
