import { useState, useEffect } from "react";
import "./App.css";
import AddNoteForm from "./components/AddNoteForm";
import NotesList from "./components/NotesList";

function App() {
  const [notes, setNotes] = useState([]);
  function saveNoteToLocalStorage(notes: any) {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  useEffect(() => {
    let stringifiedNotesFromLocalStorage = localStorage.getItem("notes");
    if (stringifiedNotesFromLocalStorage) {
      let notesFromLocalStorage = JSON.parse(stringifiedNotesFromLocalStorage);
      setNotes(notesFromLocalStorage);
    }
  }, []);
  // [{
  //   id: 1,
  //   title: "Note 1",
  //   text: "text 1",
  //   priority: 5,
  //   category: "family",
  //   author: {
  //     profile: "/src/assets/womanProfile.png",
  //   },
  // },
  // {
  //   id: 2,
  //   title: "Note 2",
  //   text: "text 2.",
  //   priority: 1,
  //   category: "hobbies",
  //   author: {
  //     profile: "/src/assets/womanProfile.png",
  //   },
  // },]

  const [noteBeingEdited, setNoteBeingEdited] = useState({});

  const deleteNote = (id: number) => {
    let newNotesArray = notes.filter((note: any) => note.id !== id);
    setNotes(newNotesArray);
    saveNoteToLocalStorage(newNotesArray);
  };

  const editNote = (id: number) => {
    let noteToEdit = notes.find((note: any) => note.id === id);

    if (noteToEdit) {
      setNoteBeingEdited(noteToEdit);
      setNotes((prevNotes) => prevNotes.filter((note: any) => note.id !== id));
    }
  };

  const updateNote = (updatedNote: any) => {
    let newNotesArray = [updatedNote, ...notes];
    /*@ts-ignore */
    setNotes(newNotesArray);
    setNoteBeingEdited({}); // Reset the noteBeingEdited state
    saveNoteToLocalStorage(newNotesArray);
  };

  return (
    <div className="app box-border flex justify-center items-center w-full h-screen py-14 gap-10">
      <NotesList
        notes={notes}
        deleteNote={deleteNote}
        editNote={editNote}
        setNotes={setNotes}
      />
      <AddNoteForm noteBeingEdited={noteBeingEdited} updateNote={updateNote} />
    </div>
  );
}

export default App;
