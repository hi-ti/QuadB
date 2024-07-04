import express from "express";
import { recommendProducts } from "../controllers/recommendation.js";

const router = express.Router();

router.route("/").get(recommendProducts);


export default router;