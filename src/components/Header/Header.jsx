import React from "react";
import "./Header.css";

const Header = ({ note, currentNote, activeNotes }) => {
  let activeNotesArray = Array.from(activeNotes);
  console.log(activeNotesArray);
  return (
    <div className="header">
      {activeNotesArray.map((value) => {
        return (
          <div key={note[value].id} className="header-container">
            <button className="header-btn">
              {note[value].title || "Untitled"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Header;
