export async function register() {
  // Node.js 22 activates an experimental localStorage via --localstorage-file,
  // but without a valid path it throws on getItem/setItem. Next.js DevOverlay
  // calls localStorage during SSR, causing a 500 error. We replace it with a
  // safe no-op implementation for the server environment.
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.getItem('__test__');
    } catch {
      Object.defineProperty(global, 'localStorage', {
        value: {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
          clear: () => {},
          key: () => null,
          length: 0,
        },
        writable: true,
        configurable: true,
      });
    }
  }
}
