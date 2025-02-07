import { randomUUID } from 'node:crypto'
import { basename, extname } from 'node:path'

export function generateUniqueFileName(fileName: string) {
  const extension = extname(fileName)
  const withoutExtension = basename(fileName, extension)
  const sanitizedFileName = withoutExtension.replace(/[^a-zA-Z0-9]/g, '')

  return `${randomUUID()}-${sanitizedFileName.concat(extension)}`
}
