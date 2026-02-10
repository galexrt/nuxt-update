import { defineNuxtPlugin, useRouter } from "nuxt/app"

export default defineNuxtPlugin({
  name: "nuxt-update",

  async setup(nuxtApp) {
    const options = nuxtApp.$config.public.update
    if (!options.version) {
      if (process.env.NODE_ENV !== "development") {
        console.warn(
          "nuxt-update will not check for updates because app version not set.",
        )
      }
      return
    }

    let lastCheckTime = new Date()
    const unregister = useRouter().afterEach(async () => {
      const last_check_interval = +new Date() - +lastCheckTime
      if (last_check_interval < options.checkInterval * 1000) {
        return
      }

      // Update last check time
      lastCheckTime = new Date()

      try {
        const version = await retrieveRemoteVersion(options.path)
        if (version !== options.version) {
          // Remove the hook when an update is detected, no point in checking again.
          unregister()

          options.version = version
          nuxtApp.callHook("updateCheck:update", version)
        }
      } catch (err) {
        console.error("Failed to check for updates:", err)
      }
    })
  },
})

async function retrieveRemoteVersion(path: string) {
  try {
    const data = await $fetch<{ version?: string }>(path)
    if (data?.version) {
      return data.version
    }
    throw new Error("Malformed version response.")
  } catch (err) {
    if (err instanceof Error && err.message === "Malformed version response.") {
      throw err
    }
    throw new Error("Request failed.")
  }
}
