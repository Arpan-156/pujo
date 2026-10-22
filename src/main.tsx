import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { registerSW } from 'virtual:pwa-register';

declare global {
  interface Window {
    deferredPWAInstallPrompt: any;
    checkForAppUpdate?: () => Promise<boolean>;
  }
}

// Catch the install prompt early before React mounts
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredPWAInstallPrompt = e;
  // Also dispatch a custom event in case components are already mounted and waiting
  window.dispatchEvent(new CustomEvent('pwa-prompt-ready', { detail: e }));
});

// Register Service Worker for PWA with automatic instant updates
if ('serviceWorker' in navigator) {
  let refreshing = false;

  // When the new service worker activates and claims the client, refresh to display the latest commit
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });

  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      // Automatically activate the new service worker immediately so mobile apps get the update
      console.log('[PWA] New version detected from server. Updating immediately...');
      updateSW(true);
    },
    onOfflineReady() {
      console.log('[PWA] App is ready for offline use.');
    },
    onRegisteredSW(_swUrl, registration) {
      if (registration) {
        // Expose a manual update check function on window
        window.checkForAppUpdate = async () => {
          try {
            console.log('[PWA] Checking for updates...');
            await registration.update();
            return true;
          } catch (err) {
            console.warn('[PWA] Update check failed:', err);
            return false;
          }
        };

        const triggerUpdate = () => {
          registration.update().catch(() => {});
        };

        // Periodic check for new commits every 10 minutes
        setInterval(triggerUpdate, 10 * 60 * 1000);

        // Check for updates when user opens/resumes the mobile app from background (Android & iOS)
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            triggerUpdate();
          }
        });

        window.addEventListener('focus', triggerUpdate);

        // iOS WebKit specific: fires when app is brought to foreground or restored from BFCache
        window.addEventListener('pageshow', () => {
          triggerUpdate();
        });

        // Check when device reconnects to internet
        window.addEventListener('online', triggerUpdate);
      }
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
