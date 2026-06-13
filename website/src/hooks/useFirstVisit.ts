import { useState, useEffect } from 'react';

const KEY = 'emergence-reader-hint-seen';

/**
 * Returns true the very first time a user enters the reader.
 * Once dismissed, never shows again (persisted in localStorage).
 */
export function useFirstVisit(): [boolean, () => void] {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        setShow(true);
      }
    } catch {
      /* ignore private-browsing errors */
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
  };

  return [show, dismiss];
}
