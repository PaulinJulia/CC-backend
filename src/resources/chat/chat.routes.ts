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

// GET /chatMessages: Retrieve a list of chatMessages.
// GET /chatMessages/{chatMessageId}: Retrieve a specific chatMessage by ID.
// GET /characters/{characterId}/chatMessages: Retrieve all chatMessages by a specific character.
// POST /character/{characterId}/chatMessages: Create a new chatMessage for a specific character.
// PUT /chatMessages/{chatMessageId}: Update a specific chatMessage by ID.
// DELETE /chatMessages/{chatMessageId}: Delete a specific chatMessage by ID.

// CRUD for stories
// router.get("/chatMessages", getChatMessages);
// router.get("/chatMessages/:id", getChatMessage);
// router.get("/characters/:characterId/chatMessages", getChatMessagesByCharacter);
router.post(
  "/characters/:characterId/chatMessage",
  createChatMessageByCharacter
);
// router.put("/chatMessages/:id", updateChatMessage);
// router.delete("/chatMessages/:id", deleteChatMessage);

export default router;
