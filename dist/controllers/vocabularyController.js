"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVocabulary = exports.updateNumberTimes = exports.updateVocabulary = exports.addVocabulary = exports.getRandomVocabularyByIdUser = exports.getAllVocabularyByIdUser = exports.getCountOfVocabularyByUser = void 0;
const vocabulary_1 = __importDefault(require("../models/vocabulary"));
const getCountOfVocabularyByUser = (req, res) => {
    const { id } = req.params;
    const filterQuery = { userId: id };
    vocabulary_1.default.find(filterQuery)
        .then(result => {
        const initReduce = {
            total: result.length,
            numOfDone: 0,
            numOfDoing: 0,
        };
        const counts = result.reduce((acc, voc) => {
            voc.status ? acc.numOfDoing++ : acc.numOfDone++;
            return acc;
        }, initReduce);
        res.json(counts);
    })
        .catch(err => res.status(500).json({ message: err.message }));
};
exports.getCountOfVocabularyByUser = getCountOfVocabularyByUser;
const getAllVocabularyByIdUser = (req, res) => {
    const { id } = req.params;
    const filterQuery = { userId: id };
    vocabulary_1.default.find(filterQuery)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ message: err.message }));
};
exports.getAllVocabularyByIdUser = getAllVocabularyByIdUser;
const getRandomVocabularyByIdUser = (req, res) => {
    var _a;
    const { id } = req.params;
    const { quantity } = (_a = req.query) !== null && _a !== void 0 ? _a : 0;
    const filterQuery = { userId: id, status: true };
    vocabulary_1.default.find(filterQuery)
        .sort({ numberOfIncorrectTimes: -1, numberOfCorrectTimes: 1 })
        .limit(Number(quantity) || 0)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ message: err.message }));
};
exports.getRandomVocabularyByIdUser = getRandomVocabularyByIdUser;
const addVocabulary = (req, res) => {
    // {
    //   userId: '657bee062c24562c7e0e9b71',
    //   word: 'write',
    //   type: 'v',
    //   meaning: 'viết',
    // }
    const data = Object.assign(Object.assign({}, req.body), { status: true, numberOfCorrectTimes: 0, numberOfIncorrectTimes: 0 });
    // check already word
    const filterQuery = {
        userId: data.userId,
        word: data.word,
        type: data.type,
    };
    vocabulary_1.default.find(filterQuery)
        .countDocuments()
        .then(count => {
        if (count > 0) {
            res.json(null);
        }
        else {
            const newVocabulary = new vocabulary_1.default(data);
            newVocabulary.save().then(result => res.json(result));
        }
    })
        .catch(err => res.status(500).json({ message: err.message }));
};
exports.addVocabulary = addVocabulary;
const updateVocabulary = (req, res) => {
    const { id, userId, word, type, meaning, status, numberOfCorrectTimes, numberOfIncorrectTimes, } = req.body;
    const filterQuery = { _id: id, userId };
    const updateQuery = {
        $set: {
            word,
            type,
            meaning,
            status,
            numberOfCorrectTimes,
            numberOfIncorrectTimes,
        },
    };
    vocabulary_1.default.updateOne(filterQuery, updateQuery)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ message: err.message }));
};
exports.updateVocabulary = updateVocabulary;
const updateNumberTimes = (req, res) => {
    const { id, userId, numberOfCorrectTimes, numberOfIncorrectTimes, } = req.body;
    const filterQuery = { _id: id, userId };
    const updateQuery = {
        $set: {
            numberOfCorrectTimes,
            numberOfIncorrectTimes,
            status: numberOfCorrectTimes < 100,
        },
    };
    vocabulary_1.default.updateOne(filterQuery, updateQuery)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ message: err.message }));
};
exports.updateNumberTimes = updateNumberTimes;
const deleteVocabulary = (req, res) => {
    const { id } = req.params;
    const filterQuery = { _id: id };
    vocabulary_1.default.deleteOne(filterQuery)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ message: err.message }));
};
exports.deleteVocabulary = deleteVocabulary;
//# sourceMappingURL=vocabularyController.js.map