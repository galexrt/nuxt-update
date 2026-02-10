import {
  addPlugin,
  addServerHandler,
  addTypeTemplate,
  createResolver,
  defineNuxtModule,
} from "@nuxt/kit"

export interface ModuleOptions {
  /**
   * URL path where the current version is published.
   *
   * @default /version.json
   */
  path: string
  /**
   * Minimum interval between update checks (in seconds).
   *
   * @default 60
   */
  checkInterval: number
  /**
   * Current version of the app.
   *
   * Must be set in runtime via NUXT_PUBLIC_UPDATE_VERSION.
   *
   * If not provided, no update checks will be performed.
   */
  version: string | number | null
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-update",
    configKey: "update",
  },
  defaults: {
    path: "/version.json",
    checkInterval: 60,
    version: null,
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.update = {
      ...nuxt.options.runtimeConfig.public.update,
      ...options,
    }

    addTypeTemplate({
      filename: "types/nuxt-update.d.ts",
      src: resolve("./runtime/nuxt-hooks.d.ts"),
    })

    addPlugin({ src: resolve("./runtime/plugin"), mode: "client" })
    addServerHandler({
      route: options.path,
      handler: resolve("./runtime/server-handler"),
    })
  },
})
