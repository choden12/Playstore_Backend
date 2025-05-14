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
app.get('/categories/apps', (c) => {
  // Enum values are static, so we can hardcode them or import from Prisma if available
  const categories = ['recommended', 'reference', 'productivity']
  return c.json(categories)
  })
// GET route to fetch a game by ID
app.get('/games/:id', async (c) => {
  const id = parseInt(c.req.param('id'))

  if (isNaN(id)) {
    return c.json({ error: 'Invalid game ID' }, 400)
  }

  const game = await prisma.games.findUnique({
    where: { id },
  })

  if (!game) {
    return c.json({ error: 'Game not found' }, 404)
  }

  return c.json(game)
})

// POST route to create a new game
app.post('/games', async (c) => {
  const body = await c.req.json()

  const { title, description, category, rating, imageurl } = body

  try {
    const newGame = await prisma.games.create({
      data: {
        title,
        description,
        category,
        rating,
        imageurl,
      },
    })

    return c.json(newGame, 201)
  } catch (error) {
    console.error('Error creating game:', error)
    return c.json({ error: 'Failed to create game' }, 500)
  }
})

// GET route to list all unique categories
app.get('/categories/games', async (c) => {
  const categories = await prisma.games.findMany({
    distinct: ['category'],
    select: {
      category: true,
    },
    where: {
      category: {
        not: null,
      },
    },
  })

  // Extract category names into an array of strings
  const categoryList = categories.map((item) => item.category)

  return c.json(categoryList)
})

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
