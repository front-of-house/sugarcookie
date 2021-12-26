# sugarcookie

[![npm version](https://img.shields.io/npm/v/sugarcookie?style=flat&colorA=4488FF&colorB=4488FF)](https://www.npmjs.com/package/sugarcookie) [![test coverage](https://img.shields.io/coveralls/github/sure-thing/sugarcookie?style=flat&colorA=223355&colorB=223355)](https://coveralls.io/github/sure-thing/sugarcookie?branch=main) [![npm bundle size](https://badgen.net/bundlephobia/min/sugarcookie?color=223355&labelColor=223355)](https://bundlephobia.com/result?p=sugarcookie)

A sweet little HTTP cookie parser/serializer for Node.js and the browser.

```
npm i sugarcookie
```

## Usage

```javascript
import { parse, serialize } from 'sugarcookie'

parse('foo=bar')

// { foo: 'bar' }

serialize('foo', 'bar', {
  expires: new Date(2021, 11, 25),
  sameSite: 'Lax',
  httpOnly: true,
  secure: true,
})

// `foo=bar; Expires=Sat, 25 Dec 2021 06:00:00 GMT; SameSite=Lax; HttpOnly; Secure
```

**Note:** `sugarcookie` doesn't validate the values you pass in. Typescript will
give you guidance, but ultimately ensuring your values match spec is up to you.

### Serializer options

- `domain` - `string`
- `expires` - `Date` or `string`
- `httpOnly` - `boolean`
- `maxAge` - `number` in seconds
- `path` - `string`
- `sameSite` - `Strict`, `Lax`, or `None`
- `secure` - `boolean`

### Aliases

Of course, you can also use the aliases.

```javascript
import { thaw, bake } from 'sugarcookie'
```

### License

MIT License © [Sure Thing](https://github.com/sure-thing)
