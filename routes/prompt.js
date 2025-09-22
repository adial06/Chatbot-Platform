import express from "express";
import { addPrompt,getPrompts } from "../controllers/promptcontroller.js";

const router = express.Router({ mergeParams: true });

router.post("/",addPrompt);

router.get("/", getPrompts);

export default router;
