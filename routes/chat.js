import express from "express";
import { chatWithProject } from "../controllers/chatcontrollers.js";

const router = express.Router({ mergeParams: true });

router.post("/:projectId/chat", chatWithProject);

export default router;
