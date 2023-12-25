"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.addUser = exports.login = exports.getAllUsers = exports.hasUsername = void 0;
const user_1 = __importDefault(require("../models/user"));
const jwtService_1 = __importDefault(require("../services/jwtService"));
const hasUsername = (req, res) => {
    const { username } = req.params;
    const filterQuery = { username };
    user_1.default.findOne(filterQuery)
        .then(user => res.json({ isExist: !!user }))
        .catch(err => res.status(500).json({ message: err.message }));
};
exports.hasUsername = hasUsername;
const getAllUsers = (req, res) => {
    user_1.default.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ message: err.message }));
};
exports.getAllUsers = getAllUsers;
const login = (req, res) => {
    const { username, password } = req.body;
    const filterQuery = { username, password };
    user_1.default.findOne(filterQuery)
        .then(user => {
        if (user) {
            const token = jwtService_1.default.generateAccessToken(user);
            res.json({ token });
        }
        else {
            res.json({ message: 'Invalid username or password' });
        }
    })
        .catch(err => res.status(500).json({ message: err.message }));
};
exports.login = login;
const addUser = (req, res) => {
    // { username: 'new', password: 'cc' }
    const newUser = new user_1.default(req.body);
    newUser
        .save()
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ message: err.message }));
};
exports.addUser = addUser;
const updateUser = (req, res) => {
    // { id: '', username: 'new', password: '' }
    const { id, username, password } = req.body;
    const filterQuery = { _id: id };
    const updateQuery = { $set: { username, password } };
    user_1.default.updateOne(filterQuery, updateQuery)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ message: err.message }));
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const { id } = req.params;
    const filterQuery = { _id: id };
    user_1.default.deleteOne(filterQuery)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ message: err.message }));
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map