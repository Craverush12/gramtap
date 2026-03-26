"use client";

import { useEffect, useRef, useState } from "react";

type StabilizerStatus = "idle" | "measuring" | "stabilized";

export function useStabilizer(
  rawGrams: number,
  isTouching: boolean
): { stableGrams: number; status: StabilizerStatus } {
  const readingsRef = useRef<number[]>([]);
  const [stableGrams, setStableGrams] = useState(0);
  const [status, setStatus] = useState<StabilizerStatus>("idle");

  useEffect(() => {
    if (!isTouching) {
      readingsRef.current = [];
      setStableGrams(0);
      setStatus("idle");
      return;
    }

    const nextReadings = [...readingsRef.current, rawGrams].slice(-8);
    readingsRef.current = nextReadings;

    if (nextReadings.length < 8) {
      setStableGrams(rawGrams);
      setStatus("measuring");
      return;
    }

    const minReading = Math.min(...nextReadings);
    const maxReading = Math.max(...nextReadings);
    const variation = maxReading - minReading;

    if (variation <= 3) {
      const average =
        nextReadings.reduce((sum, reading) => sum + reading, 0) /
        nextReadings.length;

      setStableGrams(average);
      setStatus("stabilized");
      return;
    }

    setStableGrams(rawGrams);
    setStatus("measuring");
  }, [isTouching, rawGrams]);

  return { stableGrams, status };
}
