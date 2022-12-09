import express from "express";
import CreateUser from "../handlers/users/CreateUser.js";
import DeleteUser from "../handlers/users/DeleteUser.js";
import GetUser from "../handlers/users/GetUser.js";
import UpdateUser from "../handlers/users/UpdateUser.js";

const router = express.Router();

router.post("/create", CreateUser);
router.delete("/delete", DeleteUser);
router.get("/get", GetUser);
router.put("/update", UpdateUser);

export default router;