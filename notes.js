const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log(chalk.green.inverse('new note added'));
    } else {
        console.log(chalk.red.inverse('note title taken!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();

    const existingNotes = notes.filter((note) => note.title === title);

    if(existingNotes.length > 0){
        let filtered = notes.filter((value, index, arr) => value.title !== title);
    
        saveNotes(filtered);

        console.log(chalk.green.inverse('note removed'));
    } else {
        console.log(chalk.red.inverse('note does not exist!'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e){
        return [];
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.yellow.inverse('Your notes:'));
    notes.forEach(element => {
        console.log(chalk.yellow.inverse(element.title));
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    let obj = notes.find(note => note.title == title);

    if(obj === undefined)
        console.log(chalk.red.inverse('Note not found!'));
    else{
        console.log(chalk.inverse(obj.title));
        console.log(obj.body);
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
};