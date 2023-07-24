import React, { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import Sidebar from "./components/Sidebar/Sidebar";
import DisplayedNote from "./components/DisplayedNote/DisplayedNote";
import Split from "react-split";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: uuid(),
      title: "",
      content: "",
      date: new Date().toDateString(),
    },
  ]);

  const [currentNoteId, setCurrentNoteId] = useState(notes[0].id);
  const [activeNotes, setActiveNotes] = useState(new Set([currentNoteId]));
  const [sidebarSize, setSidebarSize] = useState(10);
  const [showSidebar, setShowSidebar] = useState(true);
  const innerWidth = useRef(window.innerWidth);
  useEffect(() => {
    innerWidth.current <= 600 && setShowSidebar(false);
  }, innerWidth);
  // Retrieve notes from local storage
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    const storedCurrentNoteId = localStorage.getItem("currentNoteId");
    if (storedNotes || storedCurrentNoteId) {
      setNotes(JSON.parse(storedNotes));
      setCurrentNoteId(JSON.parse(storedCurrentNoteId));
    }
  }, []);

  // Update local storage once notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("currentNoteId", JSON.stringify(currentNoteId));
  }, [notes, currentNoteId]);

  const addNote = () => {
    const newNote = {
      id: uuid(),
      title: "",
      content: "",
      date: new Date().toDateString(),
    };
    setNotes([newNote, ...notes]);
    setCurrentNoteId(newNote.id);
  };

  return (
    <>
      {showSidebar && (
        <Split
          sizes={[sidebarSize, 100 - sidebarSize]}
          minSize={[200]}
          maxSize={[500]}
          gutterSize={7}
          snapOffset={0}
          onDrag={(sizes) => {
            setSidebarSize(sizes[0]);
          }}
          className="main"
        >
          <Sidebar
            notes={notes}
            addNote={addNote}
            setNotes={setNotes}
            sidebarSize={sidebarSize}
            currentNoteId={currentNoteId}
            setCurrentNoteId={setCurrentNoteId}
            setActiveNotes={setActiveNotes}
            activeNotes={activeNotes}
          />

          <DisplayedNote
            notes={notes}
            setNotes={setNotes}
            currentNoteId={currentNoteId}
            activeNotes={activeNotes}
          />
        </Split>
      )}
      {!showSidebar && (
        <DisplayedNote
          notes={notes}
          setNotes={setNotes}
          currentNoteId={currentNoteId}
          activeNotes={activeNotes}
        />
      )}
    </>
  );
};

export default App;
