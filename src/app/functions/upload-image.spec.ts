import { randomUUID } from 'node:crypto'
import { Readable } from 'node:stream'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { InvalidFileFormat } from './errors/invalid-file-format'
import { uploadImage } from './upload-image'

describe('Upload Image', () => {
  beforeAll(() => {
    vi.mock('@/infra/repositories/drizzle-upload-repository', () => {
      return {
        DrizzleUploadRepository: vi.fn().mockImplementation(() => {
          return {
            insert: vi.fn().mockResolvedValue({}),
          }
        }),
      }
    })
  })

  it('should upload an image', async () => {
    const filename = `${randomUUID()}.jpeg`

    const sut = await uploadImage({
      fileName: filename,
      contentType: 'image/jpeg',
      contentStream: Readable.from([]),
    })

    expect(isRight(sut)).toBe(true)
  })

  it('should NOT upload an invalid file', async () => {
    const filename = `${randomUUID()}.pdf`

    const sut = await uploadImage({
      fileName: filename,
      contentType: 'document/pdf',
      contentStream: Readable.from([]),
    })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(InvalidFileFormat)
  })
})
