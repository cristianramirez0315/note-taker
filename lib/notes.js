const fs = require('fs');
const path = require('path');

// Functions
function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    return filteredResults;
};

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id);
    return result;
};

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return note;
};

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
};

function deleteById(id, notesArray) {
    const result = notesArray.splice(id, 1);
    return result;
};

module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote,
    deleteById
};