const fs = require('fs');
const chalk = require('chalk');

function getNotes() {
    return "Your notes..."
}

const addNote = function(title, body) {
    const notes = loadNotes();

    const duplicateNotes = notes.filter(function(note){
        return note.title === title;
    });

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log('new note added');
    } else {
        console.log('note title taken!');
    }
}

const removeNote = function(title){
    const notes = loadNotes();

    const existingNotes = notes.filter(function(note){
        return note.title === title;
    });

    if(existingNotes.length > 0){
        let filtered = notes.filter(function(value, index, arr){
            if(value.title !== title)
                return value;
        });
    
        saveNotes(filtered);

        console.log(chalk.green.inverse('note removed'));
    } else {
        console.log(chalk.red.inverse('note does not exist!'));
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e){
        return [];
    }
}

module.exports = {
    getNotes, 
    addNote,
    removeNote
};