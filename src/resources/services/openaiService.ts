// import OpenAI from "openai";
// import { Request, Response } from "express";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


// export async function chatOpenAi (chatMessage: string) {
//     try {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: chatMessage }],
//     model: "gpt-3.5-turbo",
//   });
//   return completion.choices
//     } catch (error) {
//         console.error("Error fetching from OpenAi", error);
//         throw error;
//     }
// }
// app.get("/question", async (req: Request, res: Response) => {
//   console.log("Hej från route /question");

//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "Vad är världens högsta berg?" }],
//     model: "gpt-3.5-turbo",
//   });
//   console.log(completion.choices);
// });

