import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const uploadImageRoute: FastifyPluginAsyncZod = async server => {
  server.post('/uploads', async () => {
    return 'Hello World!'
  })
}
