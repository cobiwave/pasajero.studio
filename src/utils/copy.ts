import format from 'string-format'
import xss, { getDefaultWhiteList } from 'xss'

export type CopyOptions = {
  values?: { [key: string]: string | number }
  killWidows?: number
  removeHTML?: boolean
  parseLineBreaks?: boolean
  removeLineBreaks?: boolean
}

class Copy {
  sanitize(string: string | undefined) {
    if (!string) return ''
    return xss(string, {
      whiteList: {
        ...getDefaultWhiteList(),
        a: ['href', 'title', 'target', 'rel'],
        div: ['data-replace'],
        span: ['class']
      },
      onTag(tag) {
        if (tag === 'br') return '<br aria-hidden="true" />'
      }
    })
  }

  parse(string: string, options?: CopyOptions) {
    if (!string) return ''
    if (typeof string !== 'string') return string
    const opts: CopyOptions = {
      values: { br: '<br />', ...options?.values },
      parseLineBreaks: options?.parseLineBreaks ?? true,
      removeLineBreaks: options?.removeLineBreaks ?? false,
      ...options
    }
    let s = string.trim().replace(/< \/([^>]*>)/giu, '</$1') // Cleanup the HTML. Example: < /li> -> </li>
    if (opts.parseLineBreaks) s = s.replace(/\n|<br>|<br\/>/gu, opts.removeLineBreaks ? ' ' : '{br}')
    const formatted = format(s, opts.values || {}) || s
    return this.sanitize(
      opts.removeHTML
        ? formatted.replace(/<[^<>]{1,255}>/gu, '') // note: increase range if needed
        : formatted
    )
  }

  plain(string: string | undefined, options?: CopyOptions) {
    if (!string) return ''
    return this.parse(string, { removeLineBreaks: true, removeHTML: true, ...options })
  }

  aria(label?: string, role?: string) {
    const result: { [key: string]: string } = {}
    if (label) result['aria-label'] = this.plain(label)
    if (role) result.role = this.sanitize(role)
    return result
  }

  html(string: string | undefined, options?: CopyOptions) {
    if (!string) return ''

    let html = this.parse(string, options) || ''

    if (options?.killWidows) {
      const texts = html.split(/<[^<>]{1,255}>/gu) // note: increase range if needed
      texts.forEach((text) => {
        const n = options.killWidows ?? 0 // minimum character count for the final word
        const line = text.replace(/\s/gu, ' ')
        const chunk = line.substr(-n)
        const fixed =
          line.substr(0, line.length - chunk.length) +
          chunk.replace(/(\s{1,5}$)|\s/gu, (_, $1) => {
            // keep the last space of the chunk, replace the others
            return $1 || '&nbsp;'
          })
        if (html && html.replace) html = html.replace(text, fixed)
      })
    }

    return {
      dangerouslySetInnerHTML: { __html: html }
    }
  }
}

export const copy = new Copy()
