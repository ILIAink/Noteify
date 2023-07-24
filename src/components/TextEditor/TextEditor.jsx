import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Menubar from "../Menubar/Menubar";
import Highlight from "@tiptap/extension-highlight";
import { lowlight } from "lowlight/lib/core";
import "./TextEditor.css";

import js from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import py from "highlight.js/lib/languages/python";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
lowlight.registerLanguage("py", py);

const CustomDocument = Document.extend({
  content: "heading block*",
});

const TextEditor = ({
  handleTitleChange,
  handleContentChange,
  notes,
  currentNoteId,
}) => {
  const getCurrentIndex = (id) => {
    return notes.findIndex((note) => note.id === id);
  };
  let currentIndex = getCurrentIndex(currentNoteId);
  let currentNote = notes[currentIndex];
  console.log(currentNote);
  let { content } = currentNote || {};
  const editor = useEditor(
    {
      extensions: [
        CustomDocument,
        StarterKit.configure({
          document: false,
          codeBlock: false,
        }),
        CodeBlockLowlight.configure({
          lowlight,
          defaultLanguage: "js",
        }),
        Highlight.configure({
          multicolor: true,
        }),
        Placeholder.configure({
          placeholder: ({ node }) => {
            if (node.type.name == "heading") {
              return "What’s the title?";
            }
            return "Type something...";
          },
        }),
      ],
      content: content,
      onUpdate({ editor }) {
        const content = editor.getHTML();
        handleContentChange(content);
        // Get the first node
        const firstNode = editor.getJSON().content.find((node) => node);
        // Extract text if not empty
        handleTitleChange(firstNode.content && firstNode.content[0].text);
      },
    },
    [currentNote]
  );

  return (
    <>
      <div className="note-field-container">
        <Menubar currentNote={currentNote} editor={editor} />
        <EditorContent className="editor" spellCheck="false" editor={editor} />
      </div>
    </>
  );
};

export default TextEditor;
