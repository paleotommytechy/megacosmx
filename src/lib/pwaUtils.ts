/**
 * PWA Service Worker Management
 * Handles service worker lifecycle and update notifications
 */

let refreshing = false;

export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Workers not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register(
      '/service-worker.js',
      { scope: '/' }
    );
    console.log('Service Worker registered:', registration);

    // Handle controller change (new service worker activated)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        window.location.reload();
        refreshing = true;
      }
    });

    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
};

export const checkForServiceWorkerUpdate = async () => {
  if (!('serviceWorker' in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.update();
      return registration;
    }
  } catch (error) {
    console.error('Failed to check for updates:', error);
  }

  return null;
};

export const unregisterServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.unregister();
      console.log('Service Worker unregistered');
      return true;
    }
  } catch (error) {
    console.error('Failed to unregister Service Worker:', error);
  }

  return false;
};

export const isOnline = (): boolean => {
  return navigator.onLine;
};

export const setupOnlineOfflineListeners = (
  onOnline?: () => void,
  onOffline?: () => void
) => {
  if (onOnline) {
    window.addEventListener('online', onOnline);
  }
  if (onOffline) {
    window.addEventListener('offline', onOffline);
  }

  return () => {
    if (onOnline) {
      window.removeEventListener('online', onOnline);
    }
    if (onOffline) {
      window.removeEventListener('offline', onOffline);
    }
  };
};
