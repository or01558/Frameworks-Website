import express from "express";
import CreateFramework from "../handlers/frameworks/CreateFramework.js";
import DeleteFramework from "../handlers/frameworks/DeleteFramework.js";
import GetFramework from "../handlers/frameworks/GetFramework.js";
import UpdateFramework from "../handlers/frameworks/UpdateFramework.js";

const router = express.Router();

router.post("/create", CreateFramework);
router.delete("/delete", DeleteFramework);
router.get("/get", GetFramework);
router.put("/update", UpdateFramework);

export default router;