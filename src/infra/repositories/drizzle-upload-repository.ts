import type {
  InsertFile,
  UploadRepository,
} from '@/app/repositories/upload-repository'
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
}
