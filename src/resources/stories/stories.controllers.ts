import { prisma } from "../../db/connect";
import { Request, Response } from "express";

//Get all stories - GET /stories
export async function getStories(req: Request, res: Response) {
  try {
    const stories = await prisma.story.findMany();

    if (!stories.length)
      return res.status(404).json({ message: "No characters found" });

    res.status(200).json(stories);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

// Get story - GET /stories/:id
export async function getStory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const story = await prisma.story.findUnique({
      where: {
        id: parsedId,
      },
    });

    if (!story) return res.status(404).json({ message: "Character not found" });
    res.status(200).json(story);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

//Get stories by character - GET /characters/:characterId/stories
export async function getStoriesByCharacter(req: Request, res: Response) {
  try {
    const { characterId } = req.params;

    const stories = await prisma.story.findMany({
      where: {
        characterId: parseInt(characterId),
      },
    });

    if (!stories.length)
      return res
        .status(404)
        .json({ message: "No favorite character found for this user" });

    res.status(200).json(stories);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

// Create/save story by character - POST /characters/:characterId/story
export async function createStoryByCharacter(req: Request, res: Response) {
  try {
    const { characterId } = req.params;
    const { name, basePrompt } = req.body;

    const story = await prisma.story.create({
      data: {
        name,
        basePrompt,
        characterId: parseInt(characterId),
      },
    });

    res
      .status(201)
      .json({ id: story.id, message: "Favorite character created!" });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

//Update story - PUT /stories/:id
export async function updateStory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, basePrompt } = req.body;
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const story = await prisma.story.update({
      where: {
        id: parsedId,
      },
      data: {
        name,
        basePrompt,
      },
    });

    if (!story)
      return res.status(404).json({ error: "Favorite character not updated!" });
    res.status(200).json({ message: "Favorite character updated!" });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

//Delete story - DELETE /stories/:id
export async function deleteStory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const story = await prisma.story.delete({
      where: {
        id: parsedId,
      },
    });

    if (!story)
      return res.status(404).json({ error: "Favorite character not deleted!" });
    res.status(200).json({ message: "Favorite character deleted!" });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}
