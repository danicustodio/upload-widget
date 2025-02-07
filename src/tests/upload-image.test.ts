import { randomUUID } from 'node:crypto'
import { Readable } from 'node:stream'
import { InvalidFileFormat } from '@/app/functions/errors/invalid-file-format'
import { uploadImage } from '@/app/functions/upload-image'
import { isRight } from '@/shared/either'
import { beforeAll, describe, expect, it, vi } from 'vitest'

describe('Integration - Upload Image', () => {
  beforeAll(() => {
    vi.mock('@/infra/storage/upload-to-storage', () => {
      return {
        uploadToStorage: vi.fn().mockResolvedValue({
          key: `${randomUUID()}.jpeg`,
          url: `https://storage.com/${randomUUID()}.jpeg`,
        }),
      }
    })
  })

  it('should upload an image and save on the database', async () => {
    const filename = `${randomUUID()}.jpeg`

    const sut = await uploadImage({
      fileName: filename,
      contentType: 'image/jpeg',
      contentStream: Readable.from([]),
    })

    expect(isRight(sut)).toBe(true)
  })
})
