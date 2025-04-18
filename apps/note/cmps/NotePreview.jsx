import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { NoteTxt } from "./NoteTxt.jsx"

export function NotePreview({ note , onRemove, onSetPin, updateTodo,onDuplicate}) {
    const { type } = note

  

    return (
        <article className="note-preview" >
            {type === 'NoteTxt' && <NoteTxt note={note} />}
            {type === 'NoteImg' && <NoteImg note={note} />}
            {type === 'NoteTodos' && <NoteTodos note={note} updateTodo={updateTodo} />}
            <button className="delete-note-btn icon-btn trash-can" onClick={()=>onRemove(note.id)}></button>
            <button className={`pin-note-btn icon-btn pin ${note.isPinned ? 'pinned':''}`} onClick={()=>onSetPin(note.id)}></button>
            <button className={`duplicate-note-btn icon-btn duplicate`} onClick={()=>onDuplicate(note.id)}></button>
        </article>
    )
}