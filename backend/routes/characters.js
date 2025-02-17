import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// Endpoint to serve character names
router.get("/", (req, res) => {
    const filePath = path.resolve("data/characters.json"); // Locate file
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading characters.json:", err);
            return res.status(500).json({ error: "Failed to load character names" });
        }
        res.json(JSON.parse(data));
    });
});

export default router;
