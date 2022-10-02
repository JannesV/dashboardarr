import { normalize } from "duration-fns";

/**
 *
 * @param eta
 * in seconds
 *
 */
export const parseEta = (eta: number): string => {
  const { hours, minutes, seconds } = normalize({ seconds: eta });
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
};

const padZero = (num: number) => num.toString().padStart(2, "0");

/**
 *
 * @param duration
 * in seconds
 */
export const parseDuration = (duration: number) => {
  const { hours, minutes, seconds } = normalize({ seconds: duration });

  let time = "";

  if (hours) {
    time += `${hours} hours `;
  }

  if (minutes) {
    time += `${minutes} minutes `;
  }

  time += `${seconds} seconds`;

  return time;
};
