import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from '../generated/prisma/index.js'

const prisma = new PrismaClient()

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/games', async (c) => {
  const games = await prisma.games.findMany()
  return c.json(games)
})


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
