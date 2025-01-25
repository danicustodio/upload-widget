import { env } from '@/env'
import postgres from 'postgres'
import { schema } from './schemas'
import { drizzle } from 'drizzle-orm/postgres-js'

export const pg = postgres(env.DATABASE_URL)
export const db = drizzle(pg, { schema })
