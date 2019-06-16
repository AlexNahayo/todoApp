import React, {Component} from 'react';
import './NoteForm.css';


class NoteForm extends Component {
    constructor(props){
        super(props);
        this.state ={   
        newNoteContent: '',
            };

        //this prevents an error when the user enters(for this methods)
        this.writeNote = this.writeNote.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);    
    }

//when the user iput change i.e. the user puts in text for the new note, do this by setting the newNoteContent.
//this settes the value of what's in the input box
    handleUserInput(e){
        this.setState({
            newNoteContent: e.target.value, //the value of the text input from the user.
        })
    }
    writeNote(){
        //call a method that sets the noteContent for a note to 
        //the value of the inputs.
        //passing instence of a note.
        this.props.addNote(this.state.newNoteContent);
        //to empty out the input box we need to reset the new note content we set newNoteContent back to the empty string.
        this.setState({
            newNoteContent: '',
        })
    }
    render(){
        return(
            <div  className="formWrapper">
                <input className ="noteInput"
                placeholder = "Write a new note.."
                value ={this.state.newNoteContent}
                onChange={this.handleUserInput}/>
                <button className="noteButton" onClick={this.writeNote}>Add Note</button>
            </div>
        )
    }
}


export default NoteForm;