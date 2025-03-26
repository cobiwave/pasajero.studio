export const rgbaToHex = (rgba: string): string => {
  const result = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d*\.?\d+)\s*\)/u.exec(rgba)
  if (!result) {
    throw new Error(`Invalid RGBA color format: ${rgba}`)
  }

  const r = parseInt(result[1], 10)
  const g = parseInt(result[2], 10)
  const b = parseInt(result[3], 10)
  const a = Math.round(parseFloat(result[4]) * 255)

  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}${a.toString(16).padStart(2, '0')}`
}

export const rgbToHex = (rgb: string): string => {
  const result = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/u.exec(rgb)
  if (!result) {
    throw new Error(`Invalid RGB color format: ${rgb}`)
  }

  const r = parseInt(result[1], 10)
  const g = parseInt(result[2], 10)
  const b = parseInt(result[3], 10)

  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}
