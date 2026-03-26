"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseForceTouchReturn {
  rawGrams: number;
  isSupported: boolean;
  isSafari: boolean;
  isTouching: boolean;
}

export function useForceTouch(maxGrams: number): UseForceTouchReturn {
  const [rawGrams, setRawGrams] = useState(0);
  const [isSupported, setIsSupported] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  const resetTimeoutRef = useRef<number | null>(null);
  const forceRafRef = useRef<number | null>(null);
  const touchStateRafRef = useRef<number | null>(null);

  const clearResetTimeout = useCallback(() => {
    if (resetTimeoutRef.current !== null && typeof window !== "undefined") {
      window.clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
  }, []);

  const scheduleRawGrams = useCallback((nextValue: number) => {
    if (typeof window === "undefined") {
      return;
    }

    if (forceRafRef.current !== null) {
      window.cancelAnimationFrame(forceRafRef.current);
    }

    forceRafRef.current = window.requestAnimationFrame(() => {
      setRawGrams(nextValue);
      forceRafRef.current = null;
    });
  }, []);

  const scheduleTouchState = useCallback((nextValue: boolean) => {
    if (typeof window === "undefined") {
      return;
    }

    if (touchStateRafRef.current !== null) {
      window.cancelAnimationFrame(touchStateRafRef.current);
    }

    touchStateRafRef.current = window.requestAnimationFrame(() => {
      setIsTouching(nextValue);
      touchStateRafRef.current = null;
    });
  }, []);

  const handleForceChange = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();

      const touch = event.changedTouches.item(0);

      if (!touch) {
        return;
      }

      clearResetTimeout();

      const maxForce =
        touch.maximumPossibleForce > 0 ? touch.maximumPossibleForce : 1;
      const unclampedGrams = (touch.force / maxForce) * maxGrams;
      const clampedGrams = Math.min(Math.max(unclampedGrams, 0), maxGrams);

      scheduleRawGrams(clampedGrams);
    },
    [clearResetTimeout, maxGrams, scheduleRawGrams]
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      clearResetTimeout();
      scheduleTouchState(true);
    },
    [clearResetTimeout, scheduleTouchState]
  );

  const handleTouchMove = useCallback((event: TouchEvent) => {
    event.preventDefault();
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      clearResetTimeout();
      scheduleTouchState(false);

      if (typeof window !== "undefined") {
        resetTimeoutRef.current = window.setTimeout(() => {
          scheduleRawGrams(0);
        }, 400);
      }
    },
    [clearResetTimeout, scheduleRawGrams, scheduleTouchState]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const userAgent = window.navigator.userAgent;
    const safariDetected =
      /Safari/i.test(userAgent) &&
      !/(CriOS|Chrome|FxiOS|Firefox|EdgiOS|Edg|OPiOS|Opera)/i.test(userAgent);

    setIsSafari(safariDetected);
    setIsSupported("ontouchforcechange" in window);

    const listenerOptions: AddEventListenerOptions = { passive: false };

    document.addEventListener(
      "touchforcechange",
      handleForceChange as EventListener,
      listenerOptions
    );
    document.addEventListener(
      "touchstart",
      handleTouchStart as EventListener,
      listenerOptions
    );
    document.addEventListener(
      "touchmove",
      handleTouchMove as EventListener,
      listenerOptions
    );
    document.addEventListener(
      "touchend",
      handleTouchEnd as EventListener,
      listenerOptions
    );
    document.addEventListener(
      "touchcancel",
      handleTouchEnd as EventListener,
      listenerOptions
    );

    return () => {
      document.removeEventListener(
        "touchforcechange",
        handleForceChange as EventListener,
        listenerOptions
      );
      document.removeEventListener(
        "touchstart",
        handleTouchStart as EventListener,
        listenerOptions
      );
      document.removeEventListener(
        "touchmove",
        handleTouchMove as EventListener,
        listenerOptions
      );
      document.removeEventListener(
        "touchend",
        handleTouchEnd as EventListener,
        listenerOptions
      );
      document.removeEventListener(
        "touchcancel",
        handleTouchEnd as EventListener,
        listenerOptions
      );

      clearResetTimeout();

      if (forceRafRef.current !== null) {
        window.cancelAnimationFrame(forceRafRef.current);
      }

      if (touchStateRafRef.current !== null) {
        window.cancelAnimationFrame(touchStateRafRef.current);
      }
    };
  }, [
    clearResetTimeout,
    handleForceChange,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart
  ]);

  return {
    rawGrams,
    isSupported,
    isSafari,
    isTouching
  };
}
