import type { FormVariant, ZooxTheme } from '@/types';

import { complaintForm, feedbackForm, lostFoundForm } from '@/data/mock/mock-forms';

import { AspectRatioEnum, ZooxThemeEnum, ZooxThemeHexEnum } from '@/types';

const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

export function getScrollTop() {
  return window.scrollY || document.body.scrollTop;
}

export function getScrollLeft() {
  return window.scrollX || document.body.scrollLeft;
}

export function fixSlashes(string: string, trimEndSlash = false): string {
  let fixed = string.replace(/\/\/{1,5}/gu, '/').replace(':/', '://');
  if (fixed.endsWith('/') && trimEndSlash) fixed = fixed.slice(0, -1);
  return fixed;
}

export function prefix(string: string, base = ''): string {
  return fixSlashes(`${base}${assetPrefix}/${string}`);
}

export function noop<T = void>(): T {
  return Promise.resolve() as T;
}

export function formatDate(date: Date | string): string {
  const formatter = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric',
    // hour12: false
  });
  return formatter.format(typeof date === 'string' ? new Date(date) : date);
}

export function deepClone(obj: unknown) {
  if (!obj || typeof obj === 'string') return obj;
  return JSON.parse(JSON.stringify(obj));
}

export const wait = (ms: number) => {
  return new Promise((r) => {
    setTimeout(r, ms);
  });
};
export const halt = wait;
export const delay = wait;
export const pause = wait;

export function getCountdown(from: number, to: number) {
  const now = new Date(from).getTime();
  const limit = new Date(to).getTime();
  const diffTime = limit - now;
  const days = diffTime < 0 ? 0 : Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours =
    diffTime < 0 ? 0 : Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = diffTime < 0 ? 0 : Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = diffTime < 0 ? 0 : Math.floor((diffTime % (1000 * 60)) / 1000);
  return {
    days: days < 10 ? `0${days}` : `${days}`,
    hours: hours < 10 ? `0${hours}` : `${hours}`,
    minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
    seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
  };
}

export function rem(value: number): number {
  const htmlStyle = window
    .getComputedStyle(document.documentElement, null)
    .getPropertyValue('font-size');
  return parseFloat(htmlStyle) * value;
}

export const px = (value: number): number => value * 0.1;

export const pxToRem = (value: number): string => `${px(value)}rem`;

export function safeRandom(): number {
  // https://kemilbeltre.medium.com/why-do-not-use-math-random-a6f8b0ad38dd
  // https://caniuse.com/cryptography
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] * 2 ** -32;
}

export function randomString(length = 6): string {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(safeRandom() * chars.length)];
  return result;
}

export function hasDiacritic(str: string): boolean {
  return /[àáâãäèéêìíîñòóôõöùúûüń]/giu.test(str);
}

export function isImageUrl(url: string): boolean {
  return /.(bmp|cur|dds|gif|icns|ico|jpg|jpeg|ktx|png|pnm|pam|pbm|pfm|pgm|ppm|psd|svg|tiff|webp)$/iu.test(
    url,
  );
}

export function isVideoUrl(url: string): boolean {
  return /.(mp4|mov|wmv|webm|avi|mkv|mts)$/iu.test(url);
}

export function download(blob: Blob, filename: string) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
}

export function getBackgroundTheme(theme: ZooxTheme = ZooxThemeEnum.Default): ZooxThemeHexEnum {
  switch (theme.toLowerCase()) {
    case ZooxThemeEnum.Black: {
      return ZooxThemeHexEnum.Black;
    }
    case ZooxThemeEnum.Light: {
      return ZooxThemeHexEnum.Light;
    }
    case ZooxThemeEnum.Dark: {
      return ZooxThemeHexEnum.Dark;
    }
    default: {
      return ZooxThemeHexEnum.Default;
    }
  }
}

export const getFormMockContent = (formVariant: FormVariant) => {
  switch (formVariant) {
    case 'feedback': {
      return feedbackForm;
    }
    case 'complaint': {
      return complaintForm;
    }
    case 'lost-found': {
      return lostFoundForm;
    }
    default: {
      return feedbackForm;
    }
  }
};

export function decorativeElementProps() {
  return {
    role: 'presentation',
    'aria-hidden': true,
  };
}

export async function copyToClipboard(text?: string): Promise<void> {
  if (!text) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error('Failed to copy text:', error);
  }
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Format minutes and seconds with leading zeros
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

export function isYouTubeUrl(url: string): boolean {
  return /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|.+\?.+)?|youtu\.be\/)([\w-]{11})$/iu.test(
    url,
  );
}

export function ratioToClass(aspectRatio: AspectRatioEnum): string {
  switch (aspectRatio) {
    case AspectRatioEnum.OneByOne: {
      return 'ratio1by1';
    }
    case AspectRatioEnum.ThreeByTwo: {
      return 'ratio3by2';
    }
    case AspectRatioEnum.SixteenByNine: {
      return 'ratio16by9';
    }
    default: {
      return 'ratio1by1';
    }
  }
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export const prettifyDate = (date: Date | number | string): string => {
  let parsedDate: Date;

  if (typeof date === 'string') {
    parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new TypeError(`Invalid date string: ${date}`);
    }
  } else {
    parsedDate = new Date(date);
  }

  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const validateEmail = (value: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validateInput = (value: string): string | null => {
  if (value.trim() === '') {
    return 'This field is required';
  }
  return null;
};

export const buildYoutubeEmbedUrl = (url: string): string => {
  const videoIdMatch =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\s/]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[&?]v=)|youtu\.be\/)([\w-]{11})/u.exec(
      url,
    );
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }
  return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
};

/**
 * Sanitizes a URL string.
 * - If the URL starts with "https://" or "http://", returns it as is.
 * - If not, adds "https://" to the beginning of the URL.
 *
 * @param url - The URL string to sanitize.
 * @returns A sanitized URL string.
 */
export const sanitizeUrl = (url: string): string => {
  const trimmedUrl = url.trim(); // Remove leading/trailing spaces
  if (/^https?:\/\//iu.test(trimmedUrl)) {
    return trimmedUrl;
  }
  return `https://${trimmedUrl}`;
};
