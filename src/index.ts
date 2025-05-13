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

// GET /apps - fetch all games
app.get('/apps', async (c) => {
  const games = await prisma.app.findMany()
  return c.json(games)
})

// GET /app/:id - fetch a single app by ID
app.get('/apps/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (isNaN(id)) {
    return c.json({ error: 'Invalid ID' }, 400)
  }
  const appData = await prisma.app.findUnique({ where: { id } })
  if (!appData) {
    return c.json({ error: 'App not found' }, 404)
  }
  return c.json(appData)
})

// POST /apps - create a new App
app.post('/apps', async (c) => {
  const body = await c.req.json()
  const { name, description, rating, image, category } = body
  if (!name || !category) {
    return c.json({ error: 'Name and category are required.' }, 400)
  }
  try {
    const appData = await prisma.app.create({
      data: {
        name,
        description,
        rating,
        image,
        category,
      },
    })
    return c.json(appData, 201)
  } catch (error) {
    return c.json({ error: (error instanceof Error ? error.message : 'An unknown error occurred') }, 500)
  }
})

// GET /categories - list all AppCategory enum values
app.get('/categories', (c) => {
  // Enum values are static, so we can hardcode them or import from Prisma if available
  const categories = ['recommended', 'reference', 'productivity']
  return c.json(categories)
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
