const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken, JWT_SECRET } = require("./middleware/auth");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Pawgress API!" });
});

// Auth routes
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Generate token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      user: { id: user.id, email: user.email, name: user.name },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      user: { id: user.id, email: user.email, name: user.name },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Protected routes
app.get("/api/users/:id", authenticateToken, async (req, res) => {
  try {
    // Only allow users to access their own data
    if (req.user.userId !== req.params.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: { pets: true },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Pet routes (protected)
app.post("/api/pets", authenticateToken, async (req, res) => {
  try {
    const { name, type, breed, birthdate } = req.body;
    const pet = await prisma.pet.create({
      data: {
        name,
        type,
        breed,
        birthdate: birthdate ? new Date(birthdate) : null,
        userId: req.user.userId,
      },
    });
    res.json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/pets/:id", authenticateToken, async (req, res) => {
  try {
    const pet = await prisma.pet.findUnique({
      where: { id: req.params.id },
      include: { activities: true },
    });

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    // Check if the pet belongs to the authenticated user
    if (pet.userId !== req.user.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Activity routes (protected)
app.post("/api/activities", authenticateToken, async (req, res) => {
  try {
    const { type, notes, petId, scheduledFor } = req.body;

    // Verify the pet belongs to the authenticated user
    const pet = await prisma.pet.findUnique({ where: { id: petId } });
    if (!pet || pet.userId !== req.user.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const activity = await prisma.activity.create({
      data: {
        type,
        notes,
        petId,
        scheduledFor: new Date(scheduledFor),
      },
    });
    res.json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.patch(
  "/api/activities/:id/complete",
  authenticateToken,
  async (req, res) => {
    try {
      // Verify the activity belongs to the authenticated user's pet
      const activity = await prisma.activity.findUnique({
        where: { id: req.params.id },
        include: { pet: true },
      });

      if (!activity || activity.pet.userId !== req.user.userId) {
        return res.status(403).json({ error: "Access denied" });
      }

      const updatedActivity = await prisma.activity.update({
        where: { id: req.params.id },
        data: { completed: true },
      });
      res.json(updatedActivity);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Dog routes (protected)
app.post("/api/dogs", authenticateToken, async (req, res) => {
  try {
    const { name, breed, birthdate } = req.body;
    const dog = await prisma.pet.create({
      data: {
        name,
        type: "DOG", // Always set type as DOG
        breed,
        birthdate: birthdate ? new Date(birthdate) : null,
        userId: req.user.userId,
      },
    });
    res.json(dog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/dogs", authenticateToken, async (req, res) => {
  try {
    const dogs = await prisma.pet.findMany({
      where: {
        userId: req.user.userId,
        type: "DOG",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(dogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/dogs/:id", authenticateToken, async (req, res) => {
  try {
    const dog = await prisma.pet.findFirst({
      where: {
        id: req.params.id,
        type: "DOG",
        userId: req.user.userId,
      },
      include: {
        activities: true,
      },
    });

    if (!dog) {
      return res.status(404).json({ error: "Dog not found" });
    }

    res.json(dog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
