const mongoose = require("mongoose");
const Admin = require("../models/adminSchema");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

module.exports = {
    registration: async (req, res) => {
        const { name, email, username, password } = req.body
        await Admin.create({ name, email, username, password });
        res.json({ message: "Admin account registered successfully" })
    },

    login: async (req, res) => {
        const { username, password } = req.body
        const admin = await Admin.findOne({ username, password });
        if (!admin) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const token = jwt.sign({ username: admin.username }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Authentication successful', token });
    },


    createUser: async (req, res) => {
        const { name, email, username } = req.body
        const photo = req.file ? req.file.filename : null;
        await User.create({ name, email, username, photo })
        res.json({ message: "User created successfully" })
    },


    getAllUsers: async (req, res) => {
        const users = await User.find({})
        res.json(users)
    },


    getById: async (req, res) => {
        const id = parseInt(req.params.id)
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(user)
    },


    updateUser: async (req, res) => {
        const id = parseInt(req.params.id)
        const { name, email, username } = req.body;
        const user = await User.findByIdAndUpdate(id, {
            $set: { name, email, username }
        })
        if (user) {
            res.json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    },


    deleteUser: async (req, res) => {
        const id = parseInt(req.params.id)
        const user = await User.findByIdAndRemove(id)
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    }
}