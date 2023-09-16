const esbuild = require('esbuild')
const path = require('path')
const fs = require('fs')

esbuild.build({
  entryPoints: ['static/index.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: 'static/bundle.js',
  plugins: [
    {
      name: 'wasm',
      setup(build) {

        // Resolve ".wasm" files to a path with a namespace
        build.onResolve({ filter: /\.wasm$/ }, args => {
          console.log(args)
          if (args.resolveDir === '') {
            return // Ignore unresolvable paths
          }
          return {
            path: path.isAbsolute(args.path) ? args.path : path.join(args.resolveDir, args.path),
              namespace: 'wasm-binary',
          }
        })

        // Virtual modules in the "wasm-binary" namespace contain the
        // actual bytes of the WebAssembly file. This uses esbuild's
        // built-in "binary" loader instead of manually embedding the
        // binary data inside JavaScript code ourselves.
        build.onLoad({ filter: /.*/, namespace: 'wasm-binary' }, async (args) => ({
          contents: await fs.promises.readFile(args.path),
          loader: 'binary',
        }))
      },
    },
  ]
})
.then(result => {
  console.log(result)
})

