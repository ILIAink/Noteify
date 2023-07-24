import React from "react";
import NotesList from "../NotesList/NotesList";
import { AiOutlinePlus } from "react-icons/ai";
import "./Sidebar.css";

const Sidebar = ({
  notes,
  addNote,
  setCurrentNoteId,
  currentNoteId,
  sidebarSize,
  setNotes,
  setActiveNotes,
  activeNotes,
}) => {
  return (
    <div className="sidebar">
      <div className="note-list">
        <AiOutlinePlus className="btn btn-add" onClick={() => addNote()} />
        {notes.map((note, index) => {
          return (
            <NotesList
              key={note.id}
              note={note}
              index={index}
              notes={notes}
              setCurrentNoteId={setCurrentNoteId}
              currentNoteId={currentNoteId}
              setNotes={setNotes}
              sidebarSize={sidebarSize}
              setActiveNotes={setActiveNotes}
              activeNotes={activeNotes}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
