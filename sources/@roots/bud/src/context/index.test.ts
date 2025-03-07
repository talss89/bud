import {join} from 'node:path'
import {beforeEach, describe, expect, it} from 'vitest'
import {Context} from '@roots/bud-framework/options'

import getContext from './index.js'

describe(`context.get`, () => {
  let context: Context

  beforeEach(async () => {
    context = await getContext({
      // @ts-ignore
      basedir: join(process.cwd(), `tests`, `util`, `project`),
    })
  })

  it(`should be accessible`, () => {
    expect(context).toBeDefined()
  })

  it(`should match expectations`, async () => {
    expect(context.basedir).toEqual(expect.stringMatching(/\/project$/))
    expect(context.bud).toEqual(
      expect.objectContaining({
        label: `bud`,
        manifestPath: expect.stringMatching(/\/package.json$/),
        version: expect.stringMatching(/^\d+\.\d+\.\d+$/),
      }),
    )
    expect(context.extensions.builtIn).toEqual(
      expect.arrayContaining([
        `@roots/bud-terser`,
        `@roots/bud-extensions/cdn`,
        `@roots/bud-extensions/esm`,
        `@roots/bud-extensions/fix-style-only-entrypoints`,
        `@roots/bud-extensions/clean-webpack-plugin`,
        `@roots/bud-extensions/webpack-provide-plugin`,
        `@roots/bud-extensions/webpack-manifest-plugin`,
        `@roots/bud-extensions/webpack-hot-module-replacement-plugin`,
        `@roots/bud-extensions/webpack-define-plugin`,
        `@roots/bud-extensions/mini-css-extract-plugin`,
        `@roots/bud-extensions/copy-webpack-plugin`,
        `@roots/bud-extensions/webpack-define-plugin`,
      ]),
    )
    expect(context.mode).toBe(`production`)
    expect(context.services).toEqual(
      expect.arrayContaining([
        `@roots/bud/services/env`,
        `@roots/bud-hooks`,
        `@roots/bud-api`,
        `@roots/bud-build`,
        `@roots/bud-cache`,
        `@roots/bud-compiler`,
        `@roots/bud-dashboard`,
        `@roots/bud-extensions`,
        `@roots/bud-server`,
        `@roots/bud/services/project`,
      ]),
    )
  })

  it(`has expected context.files`, () => {
    expect(context.files).toEqual(
      expect.objectContaining({
        'eslint.config.js': expect.any(Object),
        '.gitignore': expect.any(Object),
        'bud.config.js': expect.any(Object),
        'package.json': expect.any(Object),
        'tailwind.config.js': expect.any(Object),
        'tsconfig.json': expect.any(Object),
      }),
    )
  })
})
