const notes = require('./notes');
const yargs= require('yargs');

yargs.version('1.0.1');

//add command
yargs.command({
    command:'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,         //makes title a necessary argument
            type: 'string'              //defines the datatype of the variable as string
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.addNote(argv.title, argv.body);
    }
});

//remove command
yargs.command({
    command:'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.removeNote(argv.title);
    }
});

//list command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: function() {
        console.log("Listing all notes");
        notes.getNotes();
    }
});

//read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    }, 
    handler: function(argv) {
        notes.readNote(argv.title)
    }
});

yargs.parse();