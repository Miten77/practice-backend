const express = require("express");
const app = express();

const users = [
    { name: "Miten", age: 20, id: 1 },
    { name: "Rahul", age: 21, id: 2 }
]

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.use(express.json());

app.get("/users", (req, res) => {
    res.json(users);
});

const validateUser = (req, res, next) => {
    if (!req.body.name || !req.body.age) {
        return res.status(400).json({
            message: "Name and age are required"
        });
    } else {
        next();
    }
}

app.post("/users", validateUser, (req, res) => {
    const body = req.body;
    console.log(body);
    users.push(body);
    res.status(201).json({
        message: "successful"
    });
});

app.get("/users/:id", (req, res) => {
    console.log(req.params);
    const id = Number(req.params.id);
    const result = users.find(user => user.id === id);

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({
            message: "User not found"
        })
    }
})

app.put("/users/:id", (req, res) => {
    console.log(req.params);
    const id = Number(req.params.id);
    const result = users.find(user => user.id === id);

    if (result) {
        result.name = req.body.name 
        res.age = req.body.age 
        res.json(result);
    } else {
        res.status(404).json({
            message: "User not found"
        })
    }
});

app.delete("/users/:id", (req, res) => {
    console.log(req.params);
    const id = Number(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        const removed = users.splice(index, 1);
        console.log(removed);
        res.json({
            message: "User deleted successfully"
        });
    } else {
        res.status(404).json({
            message: "User not found"
        })
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

