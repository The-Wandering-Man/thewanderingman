"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

const btnClass = "px-2 py-1 rounded text-xs font-bold transition-colors hover:bg-gray-100";

export default function RichEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Start writing..." }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "min-h-[280px] focus:outline-none prose prose-sm max-w-none px-4 py-3",
      },
    },
  });

  // Sync external value changes (e.g. on step back)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [editor, value]);

  if (!editor) return null;

  const { state } = editor;

  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#E2E0DC" }}>
      {/* Toolbar */}
      <div
        className="flex flex-wrap gap-1 px-3 py-2 border-b"
        style={{ borderColor: "#E2E0DC", backgroundColor: "#FAFAF9" }}
      >
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass}
          style={{ fontWeight: state.selection && editor.isActive("bold") ? 900 : 400 }}
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass}
          style={{ fontStyle: editor.isActive("italic") ? "italic" : "normal" }}
          title="Italic"
        >
          I
        </button>
        <div className="w-px mx-1" style={{ backgroundColor: "#E2E0DC" }} />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={btnClass}
          style={{ color: editor.isActive("heading", { level: 2 }) ? "#0D0D0D" : "#6B6B6B" }}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={btnClass}
          style={{ color: editor.isActive("heading", { level: 3 }) ? "#0D0D0D" : "#6B6B6B" }}
          title="Heading 3"
        >
          H3
        </button>
        <div className="w-px mx-1" style={{ backgroundColor: "#E2E0DC" }} />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass}
          style={{ color: editor.isActive("bulletList") ? "#0D0D0D" : "#6B6B6B" }}
          title="Bullet list"
        >
          &#8226; List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnClass}
          style={{ color: editor.isActive("orderedList") ? "#0D0D0D" : "#6B6B6B" }}
          title="Numbered list"
        >
          1. List
        </button>
        <div className="w-px mx-1" style={{ backgroundColor: "#E2E0DC" }} />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={btnClass}
          style={{ color: editor.isActive("blockquote") ? "#0D0D0D" : "#6B6B6B" }}
          title="Blockquote"
        >
          &ldquo;&rdquo;
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className={btnClass}
          style={{ color: "#6B6B6B" }}
          title="Line break"
        >
          &#x21B5;
        </button>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={btnClass}
          style={{ color: "#6B6B6B" }}
          title="Undo"
        >
          ↩
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={btnClass}
          style={{ color: "#6B6B6B" }}
          title="Redo"
        >
          ↪
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
