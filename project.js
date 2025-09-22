import express from "express";
import { createproject } from "../controllers/projectcontroller.js";

const router = express.Router();

router.post("/", createproject);

console.log("Project routes loaded");

export default router;




