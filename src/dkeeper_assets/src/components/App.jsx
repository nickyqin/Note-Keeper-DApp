import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper } from "../../../declarations/dkeeper";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  
  async function fetchData() {
    const notesArray = await dkeeper.getNotes();
    setNotes(notesArray);
  }

  function addNote(newNote) {
    dkeeper.createNote(newNote.title, newNote.content, newNote.id);
    setNotes(prevNotes => {
      return [newNote, ...prevNotes];
    });
  }

  function deleteNote(id) {
    dkeeper.delNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem.id !== id;
      });
    });
  }
  
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
