const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    age: Number
});

const User = mongoose.model("User", userSchema);

async function addUser(user) {
    return User.create(user);
}

async function findAllUsers() {
    return User.find();
}

async function findUser(id) {
    return User.findById(id);
}

async function modifyUser(id, name ,age) {
    return User.findByIdAndUpdate(
        id,
        {
            name: name,
            age: age
        },
        {
            returnDocument: "after"
        }
    );
}

async function removeUser(id) {
    return User.findByIdAndDelete(id);
}

module.exports = { addUser, findAllUsers, findUser, modifyUser, removeUser };