import express from "express";
import { auth } from "../../middleware/auth";
import {
  getCharacters,
  getCharacter,
  getCharactersByUser,
  updateCharacter,
  createCharacterByUser,
  deleteCharacter,
} from "./characters.controllers";

const router = express.Router();

// GET /characters: Retrieve a list of characters.
// GET /characters/{characterId}: Retrieve a specific character by ID.
// GET /users/{userId}/characters: Retrieve all characters by a specific user.
// POST /users/{userId}/characters: Create a new character for a specific user.
// PUT /characters/{characterId}: Update a specific character by ID.
// DELETE /characters/{characterId}: Delete a specific character by ID.

// CRUD for characters
router.get("/characters", auth, getCharacters);
router.get("/characters/:id", auth, getCharacter);
router.get("/users/:userId/characters", auth, getCharactersByUser);
router.post("/users/:userId/characters", auth, createCharacterByUser);
router.put("/characters/:id", auth, updateCharacter);
router.delete("/characters/:id", auth, deleteCharacter);

export default router;
