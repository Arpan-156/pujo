import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { registerSW } from 'virtual:pwa-register';

declare global {
  interface Window {
    deferredPWAInstallPrompt: any;
  }
}

// Catch the install prompt early before React mounts
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredPWAInstallPrompt = e;
  // Also dispatch a custom event in case components are already mounted and waiting
  window.dispatchEvent(new CustomEvent('pwa-prompt-ready', { detail: e }));
});

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  registerSW({ immediate: true });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
