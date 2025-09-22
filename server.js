import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";
import { initDB } from "./src/models/db.js";
import projectRoutes from "./src/routes/project.js";
import promptRoutes from "./src/routes/prompt.js";
import chatroutes from "./src/routes/chat.js";

dotenv.config();
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Chatbot Platform Server is running!");
});

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.originalUrl);
  next();
});


app.use("/api/projects", projectRoutes); 
app.use("/api/projects/:projectId/prompts", promptRoutes); 
app.use("/api/projects", chatroutes);

const PORT = process.env.PORT || 5000;


initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
