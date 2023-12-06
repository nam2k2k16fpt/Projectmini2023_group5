import { useState } from 'react';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import React from 'react'
import '../styles/tiptapstyle.css'
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import Placeholder from "@tiptap/extension-placeholder";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <div>
        <button type='button'
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is_active" : ""}
        >
          <FaBold />
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is_active" : ""}
        >
          <FaItalic />
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is_active" : ""}
        >
          <FaUnderline />
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is_active" : ""}
        >
          <FaStrikethrough />
        </button>
        <button type='button'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is_active" : ""
          }
        >
          <LuHeading1 />
        </button>
        <button type='button'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is_active" : ""
          }
        >
          <LuHeading2 />
        </button>
        <button type='button'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is_active" : ""
          }
        >
          <LuHeading3 />
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is_active" : ""}
        >
          <FaListUl />
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is_active" : ""}
        >
          <FaListOl />
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is_active" : ""}
        >
          <FaQuoteLeft />
        </button>
      </div>
      <div>
        <button type='button' onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
        </button>
        <button type='button' onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

const TipTap = ({ data, onChange }) => {
  // console.log('data', data);
  const [isBlurred, setIsBlurred] = useState(false);

  const handleBlur = () => {
    setIsBlurred(true);
  };

  const handleFocus = () => {
    setIsBlurred(false);
  };

  const handleContentChange = (content) => {
    onChange(content);
  };

  const isDataEmpty = isBlurred && (!data || data.trim() === '');
  const editor = useEditor({
    extensions: [StarterKit, Underline,
      Placeholder.configure({
        placeholder: "Write your article! You're the journalist.",
        showOnlyWhenEditable: false,
      })
    ],
    content: data,
    onBlur: handleBlur, 
    onFocus: handleFocus, 
    onUpdate({ editor }) {
      handleContentChange(editor.getHTML());
    }


  });

  return (
    <div className={`textEditor ${isDataEmpty ? 'border-danger' : ''}`}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
