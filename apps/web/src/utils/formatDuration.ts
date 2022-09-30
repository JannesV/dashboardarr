import { normalize } from "duration-fns";

/**
 *
 * @param duration
 * in seconds
 *
 */
export const parseDuration = (duration: number): string => {
  const { hours, minutes, seconds } = normalize({ seconds: duration });
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
};

const padZero = (num: number) => num.toString().padStart(2, "0");
