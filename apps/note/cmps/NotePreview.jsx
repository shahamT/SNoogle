import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { NoteTxt } from "./NoteTxt.jsx"

export function NotePreview({ note , onRemove, onSetPin, updateTodo}) {
    const { type } = note

  

    return (
        <article className="note-preview" >
            {type === 'NoteTxt' && <NoteTxt note={note} />}
            {type === 'NoteImg' && <NoteImg note={note} />}
            {type === 'NoteTodos' && <NoteTodos note={note} updateTodo={updateTodo} />}
            <button className="delete-note-btn icon-btn trash" onClick={()=>onRemove(note.id)}></button>
            <button className={`pin-note-btn ${note.isPinned ? 'pinned':''}`} onClick={()=>onSetPin(note.id)}>pin</button>
        </article>
    )
}