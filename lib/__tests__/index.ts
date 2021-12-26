import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { parse, serialize } from '../'

test('parse - basic', async () => {
  const header = `foo=bar; baz=qux; int=0`
  const cookies = parse(header)

  assert.equal(cookies, {
    foo: 'bar',
    baz: 'qux',
    int: '0',
  })
})

test('parse - URL encoded', async () => {
  const header = `equation=E%3Dmc%5E2`
  const cookies = parse(header)

  assert.equal(cookies, {
    equation: 'E=mc^2',
  })
})

test('serialize - basic', () => {
  assert.equal(serialize('foo', 'bar'), 'foo=bar')
  assert.equal(serialize('foo', ''), 'foo')
})

test('serialize - domain', () => {
  const cookie = serialize('foo', 'bar', {
    domain: 'example.com',
  })

  assert.equal(cookie, 'foo=bar; Domain=example.com')
})

test('serialize - expires', () => {
  const expires = new Date(Date.UTC(2021, 0, 1, 6, 30, 30))
  const cookie = serialize('foo', 'bar', {
    expires,
  })

  assert.equal(cookie, `foo=bar; Expires=${expires.toUTCString()}`)

  const expires2 = new Date(Date.UTC(2021, 0, 1, 6, 30, 30)).toUTCString()
  const cookie2 = serialize('foo', 'bar', {
    expires: expires2,
  })

  assert.equal(cookie2, `foo=bar; Expires=${expires2}`)
})

test('serialize - httpOnly', () => {
  assert.equal(serialize('foo', 'bar', { httpOnly: true }), 'foo=bar; HttpOnly')
  assert.equal(serialize('foo', 'bar', { httpOnly: false }), 'foo=bar')
})

test('serialize - maxAge', () => {
  const cookie = serialize('foo', 'bar', {
    maxAge: 1000,
  })

  assert.equal(cookie, 'foo=bar; Max-Age=1000')
})

test('serialize - sameSite', () => {
  assert.equal(serialize('foo', 'bar', { sameSite: 'Lax' }), 'foo=bar; SameSite=Lax')
  assert.equal(
    // @ts-expect-error
    serialize('foo', 'bar', { sameSite: '' }),
    'foo=bar'
  )
})

test('serialize - secure', () => {
  const cookie = serialize('foo', 'bar', {
    secure: true,
  })

  assert.equal(cookie, 'foo=bar; Secure')
})

test('serialize - invalid key', () => {
  const cookie = serialize('foo', 'bar', {
    // @ts-expect-error
    invalid: true,
  })

  assert.equal(cookie, 'foo=bar')
})

test.run()
