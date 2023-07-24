import React from "react";
import { asBlob } from "html-docx-js-typescript";
import { saveAs } from "file-saver";

import {
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiParagraph,
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiFormatClear,
  RiListUnordered,
  RiListOrdered,
  RiCodeLine,
  RiFileDownloadLine,
} from "react-icons/ri";
import "./Menubar.css";
import Tags from "../Tags/Tags";

const Menubar = ({ editor, currentNote }) => {
  const saveDocx = async () => {
    const noteHTML = currentNote.content;
    const noteTitle = currentNote.title || "Untitled";
    const fileData = await asBlob(noteHTML, {
      orientation: "landscape",
      margins: { top: 100 },
    }); // asBlob() return Promise<Blob|Buffer>
    saveAs(fileData, `${noteTitle}.docx`); // save as docx file
  };
  if (!editor) {
    return null;
  }

  return (
    <div className="toolbar-container">
      <div className="marks-container">
        <RiParagraph
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive("paragraph") ? "btn-format is-active" : "btn-format"
          }
        />
        <RiH1
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "is-active btn-format"
              : "btn-format"
          }
        />
        <RiH2
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "is-active btn-format"
              : "btn-format"
          }
        />
        <RiH3
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 })
              ? "is-active btn-format"
              : "btn-format"
          }
        />
        <RiH4
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 })
              ? "is-active btn-format"
              : "btn-format"
          }
        />
      </div>
      <div className="marks-container">
        <RiBold
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold") ? "is-active btn-format" : "btn-format"
          }
        >
          bold
        </RiBold>
        <RiItalic
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic") ? "is-active btn-format" : "btn-format"
          }
        >
          italic
        </RiItalic>
        <RiStrikethrough
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike") ? "is-active btn-format" : "btn-format"
          }
        >
          strike
        </RiStrikethrough>
      </div>
      <div className="misc-container">
        <RiCodeLine
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={
            editor.isActive("code") ? "is-active btn-format" : "btn-format"
          }
        >
          code
        </RiCodeLine>
        <RiFormatClear
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="btn-format"
        >
          clear marks
        </RiFormatClear>
        <RiListUnordered
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "is-active btn-format"
              : "btn-format"
          }
        >
          bullet list
        </RiListUnordered>
        <RiListOrdered
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "is-active btn-format"
              : "btn-format"
          }
        >
          ordered list
        </RiListOrdered>
      </div>
      <button className="btn-export" onClick={() => saveDocx()}>
        <RiFileDownloadLine className="export-icon" /> Save as Docx
      </button>
    </div>
  );
};

export default Menubar;
