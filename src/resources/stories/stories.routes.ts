import express from "express";
import { auth } from "../../middleware/auth";
import {
  getStories,
  getStory,
  getStoriesByCharacter,
  updateStory,
  createStoryByCharacter,
  deleteStory,
} from "./stories.controllers";

const router = express.Router();

// GET /stories: Retrieve a list of stories.
// GET /stories/{storyId}: Retrieve a specific story by ID.
// GET /characters/{characterId}/stories: Retrieve all stories by a specific character.
// POST /character/{characterId}/stories: Create a new story for a specific character.
// PUT /stories/{storyId}: Update a specific story by ID.
// DELETE /stories/{storyId}: Delete a specific story by ID.

// CRUD for stories
router.get("/stories", auth, getStories);
router.get("/stories/:id", auth, getStory);
router.get("/characters/:characterId/stories", auth, getStoriesByCharacter);
router.post("/characters/:characterId/story", auth, createStoryByCharacter);
router.put("/stories/:id", auth, updateStory);
router.delete("/stories/:id", auth, deleteStory);

export default router;
