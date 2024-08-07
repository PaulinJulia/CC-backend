import express from "express";
import userRouter from "./resources/users/users.routes";
import charactersRouter from "./resources/characters/characters.routes";
import storiesRouter from "./resources/stories/stories.routes";
import chatRouter from "./resources/chat/chat.routes";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // För att tillåta cookies och andra credentials
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api", userRouter);
app.use("/api", charactersRouter);
app.use("/api", storiesRouter);
app.use("/api", chatRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//
