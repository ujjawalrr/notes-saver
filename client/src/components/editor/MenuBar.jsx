import { useCallback } from 'react'
import {
  AiOutlineBold,
  AiOutlineClose,
  AiOutlineEnter,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineRedo,
  AiOutlineStrikethrough,
  AiOutlineUndo,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BiParagraph } from "react-icons/bi";
import { FiCode } from "react-icons/fi";
import { MdOutlineLayersClear } from "react-icons/md";
import { PiCodeBlock, PiQuotes, PiImageSquareBold } from "react-icons/pi";
import { TbSpacingVertical } from "react-icons/tb";

const MenuBar = ({ editor }) => {
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) {
    return null;
  }

  return (
    <div className="menu border border-slate-300 rounded-lg p-2 sticky top-3 left-0 right-0 bg-white z-10 flex gap-2 flex-wrap">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`editor-btn p-1 font-black ${editor.isActive("heading", { level: 1 }) && "active-editor-btn bg-slate-300"
          }`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`editor-btn p-1 font-extrabold ${editor.isActive("heading", { level: 2 }) && "active-editor-btn bg-slate-300"
          }`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`editor-btn p-1 font-semibold ${editor.isActive("heading", { level: 3 }) && "active-editor-btn bg-slate-300"
          }`}
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`editor-btn p-1 font-medium ${editor.isActive("heading", { level: 4 }) && "active-editor-btn bg-slate-300"
          }`}
      >
        H4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`editor-btn p-1 font-normal ${editor.isActive("heading", { level: 5 }) && "active-editor-btn bg-slate-300"
          }`}
      >
        H5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`editor-btn p-1 font-normal ${editor.isActive("heading", { level: 6 }) && "active-editor-btn bg-slate-300"
          }`}
      >
        H6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`editor-btn p-1 ${editor.isActive("bold") && "active-editor-btn bg-slate-300"
          }`}
      >
        <AiOutlineBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`editor-btn p-1 ${editor.isActive("italic") && "active-editor-btn bg-slate-300"
          }`}
      >
        <AiOutlineItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`editor-btn p-1 ${editor.isActive("strike") && "active-editor-btn bg-slate-300"
          }`}
      >
        <AiOutlineStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`editor-btn p-1 ${editor.isActive("code") && "active-editor-btn bg-slate-300"
          }`}
      >
        <FiCode />
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={`editor-btn p-1`}
      >
        <MdOutlineLayersClear />
      </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className={`editor-btn p-1`}
      >
        <AiOutlineClose />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`editor-btn p-1 ${editor.isActive("paragraph") && "active-editor-btn bg-slate-300"
          }`}
      >
        <BiParagraph />
      </button>

      {/* <button onClick={addImage} className='editor-btn p-1'><PiImageSquareBold /></button> */}

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`editor-btn p-1 ${editor.isActive("bulletList") && "active-editor-btn bg-slate-300"
          }`}
      >
        <AiOutlineUnorderedList />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`editor-btn p-1 ${editor.isActive("orderedList") && "active-editor-btn bg-slate-300"
          }`}
      >
        <AiOutlineOrderedList />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`editor-btn p-1 ${editor.isActive("codeBlock") && "active-editor-btn bg-slate-300"
          }`}
      >
        <PiCodeBlock />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`editor-btn p-1 ${editor.isActive("blockquote") && "active-editor-btn bg-slate-300"
          }`}
      >
        <PiQuotes />
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={`editor-btn p-1`}
      >
        <TbSpacingVertical />
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={`editor-btn p-1`}
      >
        <AiOutlineEnter />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={`editor-btn p-1`}
      >
        <AiOutlineUndo />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={`editor-btn p-1`}
      >
        <AiOutlineRedo />
      </button>
    </div>
  );
};

export default MenuBar;
