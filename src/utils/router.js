import { useState, useEffect, useCallback } from 'react';

/**
 * Enterprise SaaS Navigation & Routing Utility
 * Handles clean HTML5 History API routing (/ and /console) with hash fallback,
 * browser history back/forward support, and mode query/param resolution.
 */

export function parseRoute() {
  if (typeof window === 'undefined') {
    return { view: 'landing', mode: null, path: '/' };
  }

  const pathname = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  // Check if hash-based route or direct path-based route
  let target = pathname;
  if (hash.startsWith('#/console')) {
    target = hash.slice(1); // e.g. "/console" or "/console/rail"
  }

  // Check if console route
  if (target === '/console' || target.startsWith('/console/')) {
    const parts = target.split('/').filter(Boolean);
    // parts[0] is 'console', parts[1] is optional mode (e.g. 'rail', 'road', 'air')
    const mode = parts[1] || null;
    return {
      view: 'console',
      mode: mode,
      path: target,
    };
  }

  // Default fallback: Landing Page
  return {
    view: 'landing',
    mode: null,
    path: '/',
  };
}

export function useAppRouter() {
  const [route, setRoute] = useState(() => parseRoute());

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(parseRoute());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = useCallback((targetPath, options = {}) => {
    const { mode, replace = false } = options;
    let fullPath = targetPath;
    if (mode) {
      const cleanPath = targetPath.replace(/\/+$/, '');
      fullPath = `${cleanPath}/${mode}`;
    }

    try {
      if (replace) {
        window.history.replaceState({ path: fullPath, mode }, '', fullPath);
      } else {
        window.history.pushState({ path: fullPath, mode }, '', fullPath);
      }
    } catch {
      // Fallback to hash if HTML5 history security context restricts pushState
      window.location.hash = fullPath.startsWith('/') ? `#${fullPath}` : `#/${fullPath}`;
    }

    setRoute(parseRoute());
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return {
    route,
    view: route.view,
    mode: route.mode,
    navigateTo,
  };
}
