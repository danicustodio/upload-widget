import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const uploadImageRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/uploads',
    {
      schema: {
        summary: 'Upload an image',
        body: z.object({
          name: z.string(),
        }),
        response: {
          201: z.object({ uploadId: z.string() }),
        },
      },
    },
    async (request, reply) => {
      return reply.status(201).send({ uploadId: 'test' })
    }
  )
}
