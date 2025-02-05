import { randomUUID } from 'node:crypto'
import { Readable } from 'node:stream'
import { InvalidFileFormat } from '@/app/functions/errors/invalid-file-format'
import { uploadImage } from '@/app/functions/upload-image'
import { isRight } from '@/shared/either'
import { describe, expect, it } from 'vitest'

describe('Integration - Upload Image', () => {
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
