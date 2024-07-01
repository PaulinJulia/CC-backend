import { prisma } from "../../db/connect";
import { Request, Response } from "express";

//Get all characters - GET /characters
export async function getCharacters(req: Request, res: Response) {
  try {
    const characters = await prisma.character.findMany();

    if (!characters.length)
      return res.status(404).json({ message: "No characters found" });

    res.status(200).json(characters);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

// Get character - GET /characters/:id
export async function getCharacter(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const character = await prisma.character.findUnique({
      where: {
        id: parsedId,
      },
    });

    if (!character)
      return res.status(404).json({ message: "Character not found" });
    res.status(200).json(character);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

//Get characters by user - GET /users/:userId/characters
export async function getCharactersByUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const characters = await prisma.character.findMany({
      where: {
        userId: parseInt(userId),
      },
    });

    if (!characters.length)
      return res
        .status(404)
        .json({ message: "No favorite character found for this user" });

    res.status(200).json(characters);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

// Create/save character by user - POST /users/:userId/characters
export async function createCharacterByUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const {
      name,
      age,
      gender,
      level,
      healthPoints,
      strength,
      dexterity,
      intelligence,
      wisdom,
      constitution,
      charisma,
      favourite,
      activeStory,
      imageURL,
      backstory,
      profession,
      species,
    } = req.body;

    const character = await prisma.character.create({
      data: {
        name,
        age,
        gender,
        level,
        healthPoints,
        strength,
        dexterity,
        intelligence,
        wisdom,
        constitution,
        charisma,
        favourite,
        activeStory,
        imageURL,
        backstory,
        profession,
        species,
        userId: parseInt(userId),
      },
    });

    res
      .status(201)
      .json({ id: character.id, message: "Favorite character created!" });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

//Update character - PUT /characters/:id
export async function updateCharacter(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const {
      name,
      age,
      gender,
      level,
      healthPoints,
      strength,
      dexterity,
      intelligence,
      wisdom,
      constitution,
      charisma,
      favourite,
      activeStory,
      imageURL,
      backstory,
      profession,
      species,
    } = req.body;

    const character = await prisma.character.update({
      where: {
        id: parsedId,
      },
      data: {
        name,
        age,
        gender,
        level,
        healthPoints,
        strength,
        dexterity,
        intelligence,
        wisdom,
        constitution,
        charisma,
        favourite,
        activeStory,
        imageURL,
        backstory,
        profession,
        species,
      },
    });

    if (!character)
      return res.status(404).json({ error: "Favorite character not updated!" });
    res.status(200).json({ message: "Favorite character updated!" });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

//Delete character - DELETE /characters/:id
export async function deleteCharacter(req: Request, res: Response) {
  try {
    const { id } = req.params;
        const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const character = await prisma.character.delete({
      where: {
        id: parsedId,
      },
    });

    if (!character)
      return res.status(404).json({ error: "Favorite character not deleted!" });
    res.status(200).json({ message: "Favorite character deleted!" });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}
