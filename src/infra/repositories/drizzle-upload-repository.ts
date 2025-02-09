import type {
  GetTotalInput,
  InsertFile,
  SearchInput,
  UploadRepository,
} from '@/app/repositories/upload-repository'
import { asc, count, desc, ilike } from 'drizzle-orm'
import { db } from '../db'
import { schema } from '../db/schemas'

export class DrizzleUploadRepository implements UploadRepository {
  async insert({ name, remoteKey, remoteUrl }: InsertFile): Promise<void> {
    await db.insert(schema.uploads).values({
      name,
      remoteKey,
      remoteUrl,
    })
  }

  async search({
    searchQuery,
    sortBy,
    sortDirection,
    page,
    pageSize,
  }: SearchInput) {
    return db
      .select({
        id: schema.uploads.id,
        name: schema.uploads.name,
        remoteKey: schema.uploads.remoteKey,
        remoteUrl: schema.uploads.remoteUrl,
        createdAt: schema.uploads.createdAt,
      })
      .from(schema.uploads)
      .where(
        searchQuery ? ilike(schema.uploads.name, `%${searchQuery}%`) : undefined
      )
      .orderBy(fields => {
        if (sortBy && sortDirection === 'asc') {
          return asc(fields[sortBy])
        }

        if (sortBy && sortDirection === 'desc') {
          return desc(fields[sortBy])
        }

        return desc(fields.id)
      })
      .offset((page - 1) * pageSize)
      .limit(pageSize)
  }

  async getTotal({ searchQuery }: GetTotalInput) {
    return db
      .select({ total: count(schema.uploads.id) })
      .from(schema.uploads)
      .where(
        searchQuery ? ilike(schema.uploads.name, `%${searchQuery}%`) : undefined
      )
  }
}
