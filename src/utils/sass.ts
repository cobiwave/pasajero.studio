// sass.ts

import * as vars from '../styles/export-vars.module.scss';

import { rgbaToHex } from '@/utils/color';

export const sass = vars.default as unknown as { [key: string]: string };

export const colors = Object.entries(sass)
  .map(([key, value]) => {
    if (value.startsWith('rgba')) {
      try {
        return [key, rgbaToHex(value)];
      } catch (error) {
        console.error(error);
        return [key, value];
      }
    }
    return [key, value];
  })
  .reduce<{ [key: string]: string }>((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

// Usage:
// sass['white']
// sass['black']
// etc...
