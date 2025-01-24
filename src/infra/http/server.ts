import { fastify } from 'fastify'
import { fastifyMultipart } from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import { fastifyCors } from '@fastify/cors'
import { env } from '@/env'
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { uploadImageRoute } from './routes/upload-image'
import fastifySwaggerUi from '@fastify/swagger-ui'

const server = fastify()

server.register(fastifyCors, { origin: '*' })

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation Error',
      issues: error.validation,
    })
  }

  return reply.status(500).send({ message: 'Internal server error' })
})

server.register(fastifyMultipart)
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Upload Server',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})
server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(uploadImageRoute)

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})
