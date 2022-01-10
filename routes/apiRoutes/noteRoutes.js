const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const db = require('../../db/db.json');
const noteIds = require('../../db/noteIds.json');
const { filterByQuery, findById, createNewNote, validateNote, deleteById } = require('../../lib/notes');

// GET all notes
router.get('/notes', (req, res) => {
    let results = db;
    if (req.query) {
        results = filterByQuery(req.query, results);
        res.json(results);
    }

});

// GET note by id
router.get('/note/:id', (req, res) => {
    const result = findById(req.params.id, db);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
})

// POST/create new note
router.post('/notes', (req, res) => {
    noteIds.id += 1;
    fs.writeFileSync(
        path.join(__dirname, '../../db/noteIds.json'),
        JSON.stringify(noteIds, null, 2)
    );
    req.body.id = noteIds.id.toString();
    if (!validateNote(req.body)) {
        res.status(400).send('Invalid note');
    } else {
        const note = createNewNote(req.body, db);
        res.json(note);
    }
});

module.exports = router;