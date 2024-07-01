import express from "express";
// import { auth } from "../../middleware/auth";
import {
//   getChatMessages,
//   getChatMessage,
//   getChatMessagesByCharacter,
//   updateChatMessage,
  createChatMessageByCharacter,
//   deleteChatMessage,
} from "./chat.controllers";

const router = express.Router();

// GET /stories: Retrieve a list of stories.
// GET /stories/{storyId}: Retrieve a specific story by ID.
// GET /characters/{characterId}/stories: Retrieve all stories by a specific character.
// POST /character/{characterId}/stories: Create a new story for a specific character.
// PUT /stories/{storyId}: Update a specific story by ID.
// DELETE /stories/{storyId}: Delete a specific story by ID.

// CRUD for stories
// router.get("/stories", getStories);
// router.get("/stories/:id", getStory);
// router.get("/characters/:characterId/stories", getStoriesByCharacter);
router.post("/characters/:characterId/chatMessage", createChatMessageByCharacter);
// router.put("/stories/:id", updateChatMessage);
// router.delete("/chatMessages/:id", deleteChatMessage);

export default router;
