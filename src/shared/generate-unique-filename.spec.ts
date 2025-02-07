import { describe, expect, it } from 'vitest'
import { generateUniqueFileName } from './generate-unique-filename'

describe('Generate Unique Filename', () => {
  it('should generate a unique filename', () => {
    const sut = generateUniqueFileName('4K Black Hole Wallpaper.png')

    expect(sut).toContain('-4KBlackHoleWallpaper.png')
  })
})
