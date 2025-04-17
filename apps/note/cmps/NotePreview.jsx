import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { NoteTxt } from "./NoteTxt.jsx"

export function NotePreview({ note , onRemove}) {
    const { type } = note
    console.log(note)



    return (
        <article className='note-preview '>
            {type === 'NoteTxt' && <NoteTxt note={note} />}
            {type === 'NoteImg' && <NoteImg note={note} />}
            {type === 'NoteTodos' && <NoteTodos note={note} />}
            <button onClick={()=>onRemove(note.id)}>Delete note</button>
        </article>
    )
}