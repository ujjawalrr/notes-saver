import { EditorContent, useEditor } from "@tiptap/react";
import "highlight.js/styles/atom-one-dark.css";
import MenuBar from "./MenuBar";
import { extensions } from "./tiptapExtensions";
import './styles.scss';

const Editor = ({ onDataChange, content, editable }) => {
  const editor = useEditor({
    editable,
    extensions: extensions,
    editorProps: {
      attributes: {
        class:
          "!prose !dark:prose-invert prose-sm sm:prose-base max-w-none mt-7 focus:outline-none prose-pre:bg-[#282c34] prose-pre:text-[#abb2bf]",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onDataChange(html);
    },
    content: content,
  });

  return (
    <div className={`w-full relative ${editable && "bg-red-200 p-2 xs:p-4"}`}>
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className="bg-red-100" />
    </div>
  );
};

export default Editor;