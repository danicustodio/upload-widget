export interface InsertFile {
  name: string
  remoteKey: string
  remoteUrl: string
}

export type SearchInput = {
  searchQuery?: string
  sortBy?: 'name' | 'createdAt' | 'id'
  sortDirection?: 'asc' | 'desc'
  page: number
  pageSize: number
}

export interface SearchOutput {
  id: string
  name: string
  remoteKey: string
  remoteUrl: string
  createdAt: Date
}

export interface GetTotalInput {
  searchQuery?: string
}

export interface GetTotalOutput {
  total: number
}

export interface UploadRepository {
  insert(data: InsertFile): Promise<void>
  search(input: SearchInput): Promise<SearchOutput[]>
  getTotal(input: GetTotalInput): Promise<GetTotalOutput[]>
}
