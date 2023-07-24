import React, { useState, useRef } from "react";
import TextEditor from "../TextEditor/TextEditor";
import Header from "../Header/Header";
import "./DisplayedNote.css";

const DisplayedNote = ({ notes, currentNoteId, setNotes, activeNotes }) => {
  const getCurrentIndex = (id) => {
    return notes.findIndex((note) => note.id === id);
  };
  let currentNoteIndex = getCurrentIndex(currentNoteId);
  const handleTitleChange = (title) => {
    const updatedNotes = [...notes];
    updatedNotes[currentNoteIndex].title = title;
    setNotes(updatedNotes);
  };

  const handleContentChange = (content) => {
    const updatedNotes = [...notes];
    updatedNotes[currentNoteIndex].content = content;
    setNotes(updatedNotes);
  };
  return (
    <div>
      {/* <Header note={note} currentNote={currentNote} activeNotes={activeNotes} /> */}
      <section className="note-container">
        <TextEditor
          handleContentChange={handleContentChange}
          handleTitleChange={handleTitleChange}
          currentNoteId={currentNoteId}
          notes={notes}
        />
      </section>
    </div>
  );
};

export default DisplayedNote;
