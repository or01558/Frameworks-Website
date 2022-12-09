import express from "express";
import {getPage, register } from "../handlers/users/actions/RegisterUser.js";

const router = express.Router();

router.get("/register", getPage);
router.post("/register", register);


export default router;