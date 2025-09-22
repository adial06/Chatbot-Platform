import { initDB } from "../models/db.js";

// this is a mock chat controller function
export async function chatWithProject(req, res) {
  const { projectId } = req.params;
  const { message } = req.body;

 // user id
  const userId = 1;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Invalid message" });
  }

  try {
    const db = await initDB();

    // checking the project exists or not
    const [projectRows] = await db.query(
      "SELECT user_id FROM projects WHERE id = ?",
      [projectId]
    );

    if (!projectRows.length) return res.status(404).json({ error: "Project not found" });
    if (projectRows[0].user_id !== userId) return res.status(403).json({ error: "Forbidden" });

 
    const [promptRows] = await db.query(
      "SELECT prompt_text FROM prompts WHERE project_id = ?",
      [projectId]
    );
    const systemText = promptRows.map(p => p.prompt_text).join("\n");

    // this would be a mock response
    const reply = "This is a mock reply for testing purposes.";

   // the response gets stored in database
    await db.query(
      "INSERT INTO chats (project_id, role, message) VALUES (?, 'user', ?)",
      [projectId, message]
    );

    // store reply
    await db.query(
      "INSERT INTO chats (project_id, role, message) VALUES (?, 'assistant', ?)",
      [projectId, reply]
    );

    // mock response would be returned using this
    res.json({ reply, meta: { provider: "mock" } });

  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: err.message });
  }
}
