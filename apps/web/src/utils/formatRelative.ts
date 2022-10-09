import {
  differenceInMonths,
  isToday,
  differenceInDays,
  differenceInYears,
} from "date-fns";

export const formatRelative = (date: Date) => {
  if (isToday(date)) {
    return "today";
  } else if (differenceInMonths(new Date(), date) === 0) {
    const diffDays = differenceInDays(new Date(), date);

    if (diffDays === 1) {
      return "a day ago";
    }

    return `${diffDays} days ago`;
  } else if (differenceInYears(new Date(), date) === 0) {
    const diffMonths = differenceInMonths(new Date(), date);

    if (diffMonths === 1) {
      return "a month ago";
    }

    return `${diffMonths} months ago`;
  } else {
    const diffYears = differenceInYears(new Date(), date);

    if (diffYears === 1) {
      return "a year ago";
    }

    return `${diffYears} years ago`;
  }
};
