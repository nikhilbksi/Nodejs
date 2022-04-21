const fs= require('fs');
const chalk= require('chalk');

//listing all notes
const getNotes=() =>{
    const notes= loadNotes();
    console.log(notes);
}

//adding new note to the database
const addNote=(title, body) =>{
    const notes= loadNotes();
    const dupNote= notes.find((note)=> note.title === title);           //checking for duplicacy, find() is faster than filter()                          

    if(!dupNote)                       //prevents duplicacy
    {
        notes.push({
            title: title,
            body: body
        });
        console.log(chalk.green.inverse('New note added'));
    }
    else
    {
        console.log(chalk.red.inverse('Note title taken'));
    }
    saveNotes(notes);
}

//removing a note
const removeNote=(title) =>{
    const notes=loadNotes();
    const newNotes= notes.filter((note)=>{
        return note.title !== title;
    });
    
    if (notes.length > newNotes.length) {
        console.log(chalk.green.inverse('Note removed'));
        saveNotes(newNotes);
    }
    else{
        console.log(chalk.red.inverse('No note found'));
    }
    console.log(newNotes);
}

//read a note
const readNote= (title) =>{
    const notes= loadNotes();
    const note= notes.find((note)=> note.title === title);
    if(note){
        console.log('Title: ' + chalk.green.inverse(note.title));
        console.log('Body: ' + (note.body));
    }
    else{
        console.log(chalk.red.inverse('No note found'));
    }
}

//interactions with the JSON file
const loadNotes=()=> {                                   //returns the stored notes from the JSON file
    try {                                                       //when error occurs as there is no JSON file or it is empty
        const dataBuffer= fs.readFileSync('data.json');
        const dataJson= dataBuffer.toString();
        return JSON.parse(dataJson);    
    } catch (error) {
        return [];                                              //returns an empty array when no data is stored, i.e., no JSON file exists
    }
}
const saveNotes=(notes) =>{
    const dataJson= JSON.stringify(notes);
    fs.writeFileSync('data.json',dataJson);
}

module.exports= {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
};