const express = require('express');
const Book = require('../model/Book');
const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            status: "Success",
            books: books
        })
    } catch(e) {
        res.status(500).json({
            status: "Failed to get books",
            message: e.message
        })
    }

})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findOne({_id: id});
        res.status(200).json({
            status: "Success",
            book: book
        })
    } catch(e) {
        res.status(500).json({
            status: "Failed to get this book",
            message: e.message
        })
    }

})

router.post('/', async (req, res) => {
    try {
        const book = await Book.create({
            ...req.body,
            user: req.user
        });
        res.status(201).json({
            status: "Success",
            book
        })
    } catch(e) {
        res.status(500).json({
            status: "Failed to add this book",
            message: e.message
        })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findAndUpdateOne({_id: id}, req.body);
        res.status(200).json({
            status: "Success",
            book
        })
    } catch(e) {
        res.status(500).json({
            status: "Failed to edit this book",
            message: e.message
        })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.unlink({_id: id});
        res.status(200).json({
            status: "Success",
            message: "book get deleted successfully"
        })
    } catch(e) {
        res.status(500).json({
            status: "Failed to delete this book",
            message: e.message
        })
    }

})

module.exports = router;