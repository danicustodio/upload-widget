import { randomUUID } from 'node:crypto'
import { getUploads } from '@/app/functions/get-uploads'
import { isRight, unwrapEither } from '@/shared/either'
import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import { makeUpload } from './factories/make-upload'

describe('Integration - Get Uploads', () => {
  it('should return all uploads', async () => {
    const namePattern = randomUUID()

    const [upload1, upload2, upload3, upload4, upload5] = await Promise.all([
      makeUpload({ name: `${namePattern}.png` }),
      makeUpload({ name: `${namePattern}.png` }),
      makeUpload({ name: `${namePattern}.png` }),
      makeUpload({ name: `${namePattern}.png` }),
      makeUpload({ name: `${namePattern}.png` }),
    ])

    const sut = await getUploads({ searchQuery: namePattern })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).total).toEqual(5)
    expect(unwrapEither(sut).uploads).toEqual([
      expect.objectContaining({ id: upload5.id }),
      expect.objectContaining({ id: upload4.id }),
      expect.objectContaining({ id: upload3.id }),
      expect.objectContaining({ id: upload2.id }),
      expect.objectContaining({ id: upload1.id }),
    ])
  })
  it('should return paginated uploads', async () => {
    const namePattern = randomUUID()

    const [upload1, upload2, upload3, upload4, upload5] = await Promise.all([
      makeUpload({ name: `${namePattern}.png` }),
      makeUpload({ name: `${namePattern}.png` }),
      makeUpload({ name: `${namePattern}.png` }),
      makeUpload({ name: `${namePattern}.png` }),
      makeUpload({ name: `${namePattern}.png` }),
    ])

    let sut = await getUploads({
      searchQuery: namePattern,
      page: 1,
      pageSize: 3,
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).total).toEqual(5)
    expect(unwrapEither(sut).uploads).toEqual([
      expect.objectContaining({ id: upload5.id }),
      expect.objectContaining({ id: upload4.id }),
      expect.objectContaining({ id: upload3.id }),
    ])

    sut = await getUploads({
      searchQuery: namePattern,
      page: 2,
      pageSize: 3,
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).total).toEqual(5)
    expect(unwrapEither(sut).uploads).toEqual([
      expect.objectContaining({ id: upload2.id }),
      expect.objectContaining({ id: upload1.id }),
    ])
  })

  it('should return sorted uploads', async () => {
    const namePattern = randomUUID()

    const [upload1, upload2, upload3, upload4, upload5] = await Promise.all([
      makeUpload({ name: `${namePattern}.png`, createdAt: new Date() }),
      makeUpload({
        name: `${namePattern}.png`,
        createdAt: dayjs().subtract(1, 'day').toDate(),
      }),
      makeUpload({
        name: `${namePattern}.png`,
        createdAt: dayjs().subtract(2, 'day').toDate(),
      }),
      makeUpload({
        name: `${namePattern}.png`,
        createdAt: dayjs().subtract(3, 'day').toDate(),
      }),
      makeUpload({
        name: `${namePattern}.png`,
        createdAt: dayjs().subtract(4, 'day').toDate(),
      }),
    ])

    let sut = await getUploads({
      searchQuery: namePattern,
      sortBy: 'createdAt',
      sortDirection: 'desc',
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).total).toEqual(5)
    expect(unwrapEither(sut).uploads).toEqual([
      expect.objectContaining({ id: upload1.id }),
      expect.objectContaining({ id: upload2.id }),
      expect.objectContaining({ id: upload3.id }),
      expect.objectContaining({ id: upload4.id }),
      expect.objectContaining({ id: upload5.id }),
    ])

    sut = await getUploads({
      searchQuery: namePattern,
      sortBy: 'createdAt',
      sortDirection: 'asc',
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).total).toEqual(5)
    expect(unwrapEither(sut).uploads).toEqual([
      expect.objectContaining({ id: upload5.id }),
      expect.objectContaining({ id: upload4.id }),
      expect.objectContaining({ id: upload3.id }),
      expect.objectContaining({ id: upload2.id }),
      expect.objectContaining({ id: upload1.id }),
    ])
  })
})
