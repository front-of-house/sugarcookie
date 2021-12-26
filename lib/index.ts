type Options = {
  domain?: string
  expires?: Date | string
  httpOnly?: boolean
  maxAge?: number
  path?: string
  sameSite?: 'Lax' | 'None' | 'Strict'
  secure?: boolean
}

const aliases = {
  domain: 'Domain',
  expires: 'Expires',
  httpOnly: 'HttpOnly',
  maxAge: 'Max-Age',
  path: 'Path',
  sameSite: 'SameSite',
  secure: 'Secure',
}

function base(name: string, value: string | number) {
  return name + (value || value === 0 ? '=' + value : '')
}

function bool(name: string) {
  return name
}

function date(name: string, value: Date | string) {
  return base(name, value instanceof Date ? value.toUTCString() : value)
}

const serializers = {
  domain: base,
  expires: date,
  httpOnly: bool,
  maxAge: base,
  path: base,
  sameSite: base,
  secure: bool,
}

export function parse(header: string): {
  [name: string]: string
} {
  const cookies = {}
  const parts = header
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)

  for (const part of parts) {
    const [key, value] = part.split('=')
    cookies[key] = decodeURIComponent(value)
  }

  return cookies
}

export function serialize(name: string, value: string, options: Options = {}) {
  const cookie = [base(name, value)]

  for (const key of Object.keys(options)) {
    const value = options[key]
    if (!value && value !== 0) continue
    const serializer = serializers[key]
    if (!serializer) continue
    const serialized = serializer(aliases[key], options[key])
    cookie.push(serialized)
  }

  return cookie.join('; ')
}

export const thaw = parse
export const bake = serialize
