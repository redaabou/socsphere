import { Router } from "express";
import { lookupIoc } from "../controllers/lookupController.js";

const router = Router();

router.post("/", lookupIoc);

export default router;