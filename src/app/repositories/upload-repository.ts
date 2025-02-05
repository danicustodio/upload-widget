export interface InsertFile {
  name: string
  remoteKey: string
  remoteUrl: string
}

export interface UploadRepository {
  insert(data: InsertFile): Promise<void>
}
