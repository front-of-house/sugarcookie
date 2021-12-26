const path = require('path')

require('esbuild').buildSync({
  entryPoints: ['lib/index.ts'],
  outdir: path.join(__dirname, '../'),
  bundle: true,
  minify: true,
  platform: 'node',
  target: 'node12',
  logLevel: 'info',
})
