"use client";
import { RefObject, useEffect, useRef } from "react";

const defaultEvents = ["mousedown", "touchstart"];

type UseClickAwayArgs<E extends Event = Event> = {
  ref: RefObject<HTMLElement | null>;
  onClickAway: (event: E) => void;
  events?: (keyof typeof defaultEvents)[];
};
export const useClickAway = <E extends Event = Event>({
  events = defaultEvents as (keyof typeof defaultEvents)[],
  onClickAway,
  ref,
}: UseClickAwayArgs<E>) => {
  const savedCallback = useRef(onClickAway);

  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const handler = (event: any) => {
      const { current: el } = ref;
      el && !el.contains(event.target) && savedCallback.current(event);
    };
    for (const eventName of events) {
      window.addEventListener(eventName.toString(), handler);
    }
    return () => {
      for (const eventName of events) {
        window.removeEventListener(eventName.toString(), handler);
      }
    };
  }, [events, ref]);
};
