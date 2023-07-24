import { useEffect, useRef, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { FaTrash } from "react-icons/Fa";
import "./NotesList.css";

const NotesList = ({
  note,
  index,
  setCurrentNoteId,
  currentNoteId,
  setNotes,
  notes,
  setActiveNotes,
  activeNotes,
}) => {
  let { title, id } = note;
  const [isHovering, setIsHovering] = useState(false);

  const handleNoteClick = () => {
    setCurrentNoteId(id);
  };

  const handleRemoveNote = (pId) => {
    const currentIndex = notes.findIndex((note) => note.id === pId);
    const updatedNotes = notes.filter((note) => note.id !== pId);

    if (currentIndex === 0 && notes.length <= 1) return;
    if (currentIndex === 0 && notes.length > 1) {
      let newIndex = currentIndex + 1;
      setCurrentNoteId(notes[newIndex].id);
      id = notes[newIndex].id;
      setNotes(updatedNotes);
    } else {
      let newIndex = currentIndex - 1;
      setCurrentNoteId(notes[newIndex].id);
      id = notes[newIndex].id;
      setNotes(updatedNotes);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => handleNoteClick()}
      className={
        id === currentNoteId ? "btn-container btn-selected" : "btn-container"
      }
    >
      <p className="title-notelist">{title || "Untitled"}</p>
      <FaTrash
        onClick={() => handleRemoveNote(id)}
        className={isHovering ? "btn-close" : "hidden"}
      />
    </div>
  );
};
export default NotesList;
