import { initDB } from "../models/db.js";

// the function to add a prompt
export async function addPrompt(req, res) {
  try {
    const { prompt_text } = req.body;
    const { projectId } = req.params; 

    if (!prompt_text) {
      return res.status(400).json({ error: "Prompt text is required" });
    }

    const db = await initDB();

    // store the prompt in database
    await db.query(
      "INSERT INTO prompts (project_id, prompt_text) VALUES (?, ?)",
      [projectId, prompt_text]
    );

    res.json({ message: "Prompt added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add prompt" });
  }
}


// getting the prompts funtion
export async function getPrompts(req, res) {
  try {
    const { projectId } = req.params;

    const db = await initDB();

    const [rows] = await db.query(
      "SELECT * FROM prompts WHERE project_id = ?",
      [projectId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
}
