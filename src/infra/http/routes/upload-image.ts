import { uploadImage } from '@/app/functions/upload-image'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

const ONE_MB = 1024 * 1024

export const uploadImageRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/uploads',
    {
      schema: {
        summary: 'Upload an image',
        consumes: ['multipart/form-data'],
        response: {
          201: z.object({ uploadId: z.string() }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const uploadedFile = await request.file({
        limits: {
          fileSize: ONE_MB * 4, // 4MB
        },
      })

      if (!uploadedFile) {
        return reply.status(400).send({ message: 'File is required' })
      }

      const { filename, mimetype, file } = uploadedFile

      await uploadImage({
        fileName: filename,
        contentType: mimetype,
        contentStream: file,
      })

      return reply.status(201).send({ uploadId: 'test' })
    }
  )
}
