const express = require("express");
const router = express.Router();
const { createUser, getUsers, getUser, updateUser, deleteUser } = require("./controllers/users.controller");

router.get("/", getUsers);

const validateUser = (req, res, next) => {
    const invalidName = typeof req.body.name !== "string" || req.body.name.trim() === "";
    const invalidAge = typeof req.body.age !== "number" || req.body.age < 1 || !Number.isInteger(req.body.age);

    if (invalidName) {
        return res.status(400).json({
            message: "Name must be a non-empty string"
        });
    }

    if (invalidAge) {
        return res.status(400).json({
            message: "Age must be a positive number"
        })
    }

    next();
}

router.post("/", validateUser, createUser);

router.get("/:id", getUser);

router.put("/:id", validateUser, updateUser);

router.delete("/:id", deleteUser);

module.exports = router;