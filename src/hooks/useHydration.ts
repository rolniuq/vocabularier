'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to safely access browser APIs like localStorage and speechSynthesis
 * Prevents hydration mismatches in Next.js
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
