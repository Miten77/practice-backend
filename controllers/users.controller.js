const { addUser, findAllUsers, findUser, modifyUser, removeUser } = require("../model/users.model");

const createUser = async (req, res,next) => {
    try {
        const body = req.body;
        const newUser = await addUser(body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const users = await findAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await findUser(id);

        if (result) {
            res.json(result);
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch(error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await modifyUser(id, req.body.name, req.body.age);

        if (result) {
            res.json(result);
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch(error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await removeUser(id);

        if (result !== null) {
            res.json(result);
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch(error) {
        next(error);
    }
};

module.exports = {
    createUser, 
    getUsers,
    getUser,
    updateUser,
    deleteUser
};