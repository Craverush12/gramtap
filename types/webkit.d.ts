declare global {
  interface Touch {
    readonly force: number;
    readonly maximumPossibleForce: number;
  }

  interface TouchEvent {
    readonly touches: TouchList;
    readonly changedTouches: TouchList;
  }
}

export {};
