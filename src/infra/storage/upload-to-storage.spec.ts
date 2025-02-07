import { Readable } from 'node:stream'
import { Upload } from '@aws-sdk/lib-storage'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { uploadToStorage } from './upload-to-storage'

describe('Upload To Storage', () => {
  beforeAll(() => {
    vi.mock('@aws-sdk/lib-storage', () => {
      return {
        Upload: vi.fn().mockImplementation(() => {
          return {
            done: vi.fn().mockResolvedValue({}),
          }
        }),
      }
    })
  })

  it('should upload a file to the storage', async () => {
    const { key, url } = await uploadToStorage({
      folder: 'images',
      fileName: '4K Black Hole Wallpaper.png',
      contentType: 'image/png',
      contentStream: Readable.from([]),
    })

    expect(Upload).toHaveBeenCalledTimes(1)
    expect(key).toContain('images/')
    expect(key).toContain('-4KBlackHoleWallpaper.png')
    expect(url).toContain('-4KBlackHoleWallpaper.png')
  })
})
