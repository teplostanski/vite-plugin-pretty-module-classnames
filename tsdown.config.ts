import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  external: ["crypto"],
  target: 'node20.18',
  clean: true,
  dts: true,
  platform: 'neutral',
  format: ['cjs', 'esm']
})
