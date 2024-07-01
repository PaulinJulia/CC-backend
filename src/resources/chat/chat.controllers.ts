import { prisma } from "../../db/connect";
import { Request, Response } from "express";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//Get all chatMessages - GET /chatMessages
// export async function getChatMessages(req: Request, res: Response) {
//   try {
//     const characters = await prisma.characters.findMany();

//     if (!characters.length)
//       return res.status(404).json({ message: "No characters found" });

//     res.status(200).json(characters);
//   } catch (error) {
//     console.error("Error details:", error);
//     res.status(500).json({ error: "Database query failed!" });
//   }
// }

// Get chatMessage by ID - GET /chatMessages/:id
// export async function getChatMessage(req: Request, res: Response) {
//   try {
//     const { id } = req.params;

//     const character = await prisma.characters.findUnique({
//       where: {
//         id: id,
//       },
//     });

//     if (!character)
//       return res.status(404).json({ message: "Character not found" });
//     res.status(200).json(character);
//   } catch (error) {
//     console.error("Error details:", error);
//     res.status(500).json({ error: "Database query failed!" });
//   }
// }

//Get chatMessages by character - GET /characters/:characterId/chatMessages
// export async function getChatMessagesByCharacter(req: Request, res: Response) {
//   try {
//     const { userId } = req.params;

//     const characters = await prisma.characters.findMany({
//       where: {
//         userId: parseInt(userId),
//       },
//     });

//     if (!characters.length)
//       return res
//         .status(404)
//         .json({ message: "No favorite character found for this user" });

//     res.status(200).json(characters);
//   } catch (error) {
//     console.error("Error details:", error);
//     res.status(500).json({ error: "Database query failed!" });
//   }
// }

// Create/save message by character - POST /characters/:characterId/chatMessage
export async function createChatMessageByCharacter(
  req: Request,
  res: Response
) {
  try {
    const { characterId } = req.params;
    const { message } = req.body;

    const parsedStoryId = parseInt(characterId, 10);
    if (isNaN(parsedStoryId)) {
      res.status(400).json({ error: "Invalid characterId" });
      return;
    }

    const chatMessage = await prisma.chatMessage.create({
      data: {
        message,
        id: parsedStoryId,
      },
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: message }],
      model: "gpt-3.5-turbo",
    });

    res.status(201).json({
      id: chatMessage.id,
      message: "Chat message created!",
      aiResponse: completion.choices,
    });
  } catch (error) {
    console.error("Error details:", error);
    res
      .status(500)
      .json({ error: "Database query failed or openAi request failed!" });
  }
}

//Update chatMessage - PUT /chatMessages/:id
// export async function updateChatMessage(req: Request, res: Response) {
//   try {
//     const { id } = req.params;
//     const {
//       name,
//       age,
//       gender,
//       level,
//       healthPoints,
//       strength,
//       dexterity,
//       intelligence,
//       wisdom,
//       constitution,
//       charisma,
//       favorite,
//       activeStory,
//       imageURL,
//       backStory,
//       profession,
//       species,
//     } = req.body;

//     const character = await prisma.characters.update({
//       where: {
//         id: id,
//       },
//       data: {
//         name,
//         age,
//         gender,
//         level,
//         healthPoints,
//         strength,
//         dexterity,
//         intelligence,
//         wisdom,
//         constitution,
//         charisma,
//         favorite,
//         activeStory,
//         imageURL,
//         backStory,
//         profession,
//         species,
//       },
//     });

//     if (!character)
//       return res.status(404).json({ error: "Favorite character not updated!" });
//     res.status(200).json({ message: "Favorite character updated!" });
//   } catch (error) {
//     console.error("Error details:", error);
//     res.status(500).json({ error: "Database query failed!" });
//   }
// }

// SKALL FUNGERA
//Delete chatMessage - DELETE /chatMessages/:id
// export async function deleteChatMessage(req: Request, res: Response) {
//   try {
//     const { id } = req.params;

//     const character = await prisma.chatMessages.delete({
//       where: {
//         id: id,
//       },
//     });

//     if (!character)
//       return res.status(404).json({ error: "Chat message not deleted!" });
//     res.status(200).json({ message: "Chat message deleted!" });
//   } catch (error) {
//     console.error("Error details:", error);
//     res.status(500).json({ error: "Database query failed!" });
//   }
// }
