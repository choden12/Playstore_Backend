import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient, Prisma } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

// Sign in
app.post("/register", async (c) => {
  try {
    const body = await c.req.json();

    const bcryptHash = await Bun.password.hash(body.password, {
      algorithm: "bcrypt",
      cost: 4,
    });

    const user = await prisma.user.create({
      data: {
        email: body.email,
        hashedPassword: bcryptHash,
        Account: {
          create: {
            balance: 0,
          },
        },
      },
    });

    return c.json({ message: `${user.email} created successfully}` });
  } catch (error) {
    return c.json({ error: error });
  }
});

//login
app.post("/login", async (c) => {
  try {
    const body = await c.req.json();

    const user = await prisma.user.findUnique({
      where: { email: body.email },
      select: { id: true, hashedPassword: true },
    });

    if (!user) {
      return c.json({ message: "User not found" });
    }

    const match = await Bun.password.verify(body.password, user.hashedPassword,"bcrypt");

    if (match) {
      return c.json({ message: "Login successful" });
    } else {
      throw new HTTPException(401, { message: "Invalid credentials" });
    }

  } catch (error) {
    throw new HTTPException(401, { message: 'Invalid credentials' })
  }
});

