import { initDB } from "../models/db.js";

// create project funtion
export async function createproject(req, res) {
  try {
    const { name, description } = req.body; 
    const user_id = 1; 

    const db = await initDB();

    // storing the project id and description
    await db.query(
      "INSERT INTO projects(user_id, project_name, description) VALUES (?, ?, ?)",
      [user_id, name, description] 
    );

    res.json({ message: " Project Created Successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create the project" });
  }
}

