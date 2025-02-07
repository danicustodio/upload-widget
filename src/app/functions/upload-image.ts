import { Readable } from 'node:stream'
import { DrizzleUploadRepository } from '@/infra/repositories/drizzle-upload-repository'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { z } from 'zod'
import { uploadToStorage } from '../../infra/storage/upload-to-storage'
import { InvalidFileFormat } from './errors/invalid-file-format'

const uploadImageInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadImageInput = z.input<typeof uploadImageInput>

const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']

export async function uploadImage(
  input: UploadImageInput
): Promise<Either<InvalidFileFormat, { url: string }>> {
  const { contentType, fileName, contentStream } = uploadImageInput.parse(input)

  if (!allowedMimeTypes.includes(contentType)) {
    return makeLeft(new InvalidFileFormat())
  }

  const { key, url } = await uploadToStorage({
    folder: 'images',
    fileName,
    contentType,
    contentStream,
  })

  const repository = new DrizzleUploadRepository()

  await repository.insert({
    name: fileName,
    remoteKey: key,
    remoteUrl: url,
  })

  return makeRight({ url })
}
