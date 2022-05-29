import {useEffect, useState} from "react";
import './App.css';
import Sidebar from './sidebar';
import Main from './main';
import React from 'react';
import uuid from 'react-uuid';

function App() {

  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  
  const [activeNote,setActiveNote]=useState(false);

  useEffect(()=>{
    localStorage.setItem("notes",JSON.stringify(notes));
  },[notes]);

  const onAddNote=()=>{
    const newNote={
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };
    
    setNotes([newNote, ...notes]);
  };

  const onUpdateNote=(UpdatedNote)=>{
    const updatedNotesArray = notes.map((note)=>{
      if(note.id==activeNote)
      {
        return UpdatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArray);
  };

  const onDeleteNote=(idToDelete)=>{
    setNotes(notes.filter((note)=>note.id !== idToDelete));
  };

  const getActiveNote=()=>{
    return notes.find((note)=>note.id===activeNote);
  };

  return (
    <div className="App">
      <Sidebar 
        notes={notes} 
        onAddNote={onAddNote} 
        onDeleteNote={onDeleteNote} 
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main 
        activeNote= {getActiveNote()} 
        onUpdateNote={onUpdateNote} 
      />
    </div>
  );
}

export default App;
