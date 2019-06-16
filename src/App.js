import React, { Component } from 'react';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import {DB_CONFIG} from './Config/Config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';


class App extends Component {

  constructor(props){
      super(props);
      

      //functionality needs to be binded in the components
       
      this.addNote = this.addNote.bind(this);
      this.app = firebase.initializeApp(DB_CONFIG);
      this.db = this.app.database().ref().child('notes');
      this.removeNote = this.removeNote.bind(this);

      // We're going to setup the React state of our component
      this.state = {
        notes: [],
      }
  }

  componentWillMount(){
    const previousNotes = this.state.notes;
    //when a child is added in our notes database(i.e. an instances of a notes object)
    //Every time you receive data in fb it is passed into DataSnapshot object. 
    this.db.on('child_added',snap => {
      previousNotes.push({
        id: snap.key, //id thar firebase provides us.
        noteContent: snap.val().noteContent,
      })
      //pushes content from firebase into previuouse notes array.
      //update state with new array.
      this.setState({
        notes : previousNotes
      })
    })


    //for deleting notes from notes. this code is listing from whenn a childe is removed from our db.
    //when child removed occurs get data snapshot and return it 
    this.db.on('child_removed', snap => {
      //loop through previouse notes array.
      for(var i = 0; i< previousNotes.length; i++){
          // if we find key that matches the snap shot id.   
          if(previousNotes[i].id === snap.key){
            //Then delete and join to remaining elements.
            previousNotes.splice(i,1);
          }
        }

        this.setState({
          notes : previousNotes
        })
      })

  }

  //adding note onto notes array which will be on the App.js/css
    addNote(note){
  
    this.db.push().set({ noteContent: note})
  }

  removeNote(noteId){
    this.db.child(noteId).remove();

  }
  render() {
    return (
      <div className="notesWrapper">
          <div className="notesHeader">
            <div className="heading">My To-Do List</div>
          </div>
          <div className="notesBody">
            {
                this.state.notes.map((note)=>{
                  return(
                    <Note noteContent={note.noteContent} noteId={note.id} key={note.id} 
                    removeNote = {this.removeNote}/>
                  )    
                })   
            }
          </div>
          <div className="notesFooter">
            <NoteForm addNote={this.addNote}/>  
        </div>
      </div>  
    );
  }
}

export default App;
