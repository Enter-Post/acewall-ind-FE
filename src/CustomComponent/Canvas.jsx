import React, { useState, useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
// import "tailwindcss/tailwind.css";

const Canvas = () => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "<p>Start writing...</p>",
  });

  const addImage = useCallback(() => {
    const url = prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-4 shadow-lg rounded-lg">
        <button onClick={addImage} className="mb-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Add Image
        </button>
        <EditorContent editor={editor} className="border p-2 rounded-md" />
      </div>
    </div>
  );
};

export default Canvas;
