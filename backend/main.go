package main

import (
    "github.com/gofiber/fiber/v2"
)
import "github.com/annie-elequin/pawgress/backend/database"


func main() {
		database.Connect()
    app := fiber.New()

    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Welcome to Dog Training Backend!")
    })

    // Example endpoint
    app.Get("/dogs", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{
            "dogs": []string{"Buddy", "Charlie", "Max"},
        })
    })

    app.Listen(":8484")
}
