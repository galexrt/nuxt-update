import type { HookResult } from "@nuxt/schema"

declare module "nuxt/app" {
  interface RuntimeNuxtHooks {
    "custom:update_check:check": () => HookResult
    "custom:update_check:version": (version: unknown) => HookResult
    "custom:update_check:update": (version: unknown) => HookResult
  }
}
