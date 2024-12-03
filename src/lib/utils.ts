import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { formatDistanceToNow, format } from 'date-fns';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else if (diffInSeconds < 86400) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else if (diffInSeconds < 604800) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else {
    return format(date, 'MMM d, yyyy');
  }
};
