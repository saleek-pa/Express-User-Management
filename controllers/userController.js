const { users } = require("../models/userModel")

module.exports = {
    post: (req, res) => {
        const { name, email, username } = req.body
        const id = Date.now()
        const user = { id, name, email, username }
        users.push(user)
        res.json({ message: "User created successfully" })
    },
    get: (req, res) => {
        res.json(users)
    },
    getById: (req, res) => {
        const id = parseInt(req.params.id)
        const user = users.find(user => user.id === id)
        res.json(user)
    },
    put: (req, res) => {
        const id = parseInt(req.params.id)
        const { name, email, username } = req.body;
        const user = users.find(user => user.id === id)
        if (user) {
            user.name = name;
            user.email = email;
            user.username = username;
            res.json({ message: 'User updated successfully', user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    },
    delete: (req, res) => {
        const id = parseInt(req.params.id)
        const userIndex = users.findIndex(user => user.id === id)
        if (userIndex !== -1) {
            users.splice(userIndex, 1)
            res.json({ message: 'Users list updated successfully', users })
        }
    }
}