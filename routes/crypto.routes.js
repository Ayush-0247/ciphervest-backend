import express from "express";
import {pricing} from "../controllers/cryptopricingcontroller.js";
import {cryptoFullName} from "../controllers/CryptoFullNameController.js";
import { graph } from "../controllers/graph.controller.js";

const router = express.Router();

router.get("/pricing/:coin", pricing);
router.get("/fullname/:coin", cryptoFullName);
router.get("/graph/:coin", graph);
export default router;