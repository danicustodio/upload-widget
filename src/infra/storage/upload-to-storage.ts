import { Readable } from 'node:stream'
import { env } from '@/env'
import { generateUniqueFileName } from '@/shared/generate-unique-filename'
import { Upload } from '@aws-sdk/lib-storage'
import { z } from 'zod'
import { r2 } from './client'

const uploadToStorageInput = z.object({
  folder: z.enum(['images', 'downloads']),
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadToStorageInput = z.input<typeof uploadToStorageInput>

export async function uploadToStorage(input: UploadToStorageInput) {
  const { folder, fileName, contentType, contentStream } =
    uploadToStorageInput.parse(input)

  const uniqueFileName = `${folder}/${generateUniqueFileName(fileName)}`

  const upload = new Upload({
    client: r2,
    params: {
      Key: uniqueFileName,
      Bucket: env.CLOUDFLARE_BUCKET,
      Body: contentStream,
      ContentType: contentType,
    },
  })

  await upload.done()

  return {
    key: uniqueFileName,
    url: new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString(),
  }
}
