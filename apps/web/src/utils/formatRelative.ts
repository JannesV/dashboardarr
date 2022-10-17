import {
  differenceInMonths,
  differenceInDays,
  differenceInYears,
  differenceInMinutes,
  differenceInHours,
} from "date-fns";

export const formatRelative = (date: Date) => {
  const diffMinutes = differenceInMinutes(new Date(), date, {
    roundingMethod: "round",
  });
  const diffHours = differenceInHours(new Date(), date, {
    roundingMethod: "round",
  });
  const diffDays = differenceInDays(new Date(), date);
  const diffMonths = differenceInMonths(new Date(), date);
  const diffYears = differenceInYears(new Date(), date);

  if (diffHours === 0) {
    if (diffMinutes === 1) {
      return "a minute ago";
    }

    return `${diffMinutes} minutes ago`;
  }
  if (diffDays === 0) {
    if (diffMinutes === 1) {
      return "an hour ago";
    }

    return `${diffHours} hours ago`;
  } else if (diffMonths === 0) {
    if (diffDays === 1) {
      return "a day ago";
    }

    return `${diffDays} days ago`;
  } else if (diffYears === 0) {
    if (diffMonths === 1) {
      return "a month ago";
    }

    return `${diffMonths} months ago`;
  } else {
    if (diffYears === 1) {
      return "a year ago";
    }

    return `${diffYears} years ago`;
  }
};
