import { DrizzleUploadRepository } from '@/infra/repositories/drizzle-upload-repository'
import { makeRight } from '@/shared/either'
import { z } from 'zod'

const getUploadsInput = z.object({
  searchQuery: z.string().optional(),
  sortBy: z.enum(['name', 'createdAt', 'id']).optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(10),
})

type GetUploadsInput = z.input<typeof getUploadsInput>

interface GetUploadsOutput {
  uploads: string[]
  total: number
}

export async function getUploads(input: GetUploadsInput) {
  const { searchQuery, sortBy, sortDirection, page, pageSize } =
    getUploadsInput.parse(input)

  const repository = new DrizzleUploadRepository()

  const [uploads, [{ total }]] = await Promise.all([
    repository.search({ searchQuery, sortBy, sortDirection, page, pageSize }),
    repository.getTotal({ searchQuery }),
  ])

  return makeRight({ uploads, total })
}
