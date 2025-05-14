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
app.get('/categories', async (c) => {
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
