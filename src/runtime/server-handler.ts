import type { IncomingMessage, ServerResponse } from "node:http"

import { fromNodeMiddleware } from "h3"

import { useRuntimeConfig } from "#imports"

const version = getVersion()

export default fromNodeMiddleware((_: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.setHeader("Cache-Control", "no-cache")
  res.end(
    JSON.stringify({
      version: version,
    }),
  )
})

function getVersion() {
  const config = useRuntimeConfig()
  return config.public.update?.version ?? null
}
