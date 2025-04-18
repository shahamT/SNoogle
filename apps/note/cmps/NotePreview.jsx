const { useState, useEffect } = React
const { useNavigate, useSearchParams } = ReactRouterDOM
import { ColorInput } from "./dynamic-inputs/ColorInput.jsx"
import { NoteEditModal } from "./NoteEditModal.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { NoteTxt } from "./NoteTxt.jsx"

export function NotePreview({ onStyleSave, openColorNoteId, setOpenColorNoteId, note, onRemove, onSetPin, updateTodo, onDuplicate }) {


    const [noteStyle, setNoteStyle] = useState(note.style || { backgroundColor: 'white' })
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

    const navigate = useNavigate()

    const isColorPalleteOpen = openColorNoteId === note.id

    function onSetColorStyle(newStyle) {
        // setNoteStyle(prevStyle => ({ ...prevStyle, ...newStyle }))
        const updatedNote = {
            ...note,
            style: {
                ...note.style,
                ...newStyle
            }
        }
        onStyleSave(updatedNote)
        setNoteStyle(updatedNote.style)
        setOpenColorNoteId(null)
    }


    function onOpenNote(noteId) {
        navigate(`/notes/edit/${noteId}`)
    }


    return (
        <article className="note-preview" style={noteStyle} onClick={() => onOpenNote(note.id)} >
            <NoteType note={note} updateTodo={updateTodo} />

            <button className="delete-note-btn icon-btn trash-can" onClick={() => onRemove(note.id)}></button>
            <button className={`pin-note-btn icon-btn pin ${note.isPinned ? 'pinned' : ''}`} onClick={() => onSetPin(note.id)}></button>
            <button className={`duplicate-note-btn icon-btn duplicate`} onClick={() => onDuplicate(note.id)}></button>


            <button
                className="color-note-btn icon-btn palette"
                onClick={() => {
                    setOpenColorNoteId(isColorPalleteOpen ? null : note.id)
                }}
            ></button>

            {isColorPalleteOpen && (
                <ColorInput note={note} onSetColorStyle={onSetColorStyle} backgroundColor={noteStyle.backgroundColor} />
            )}
        </article>
    )
}

function NoteType(props) {
    const { note } = props
    const type = note.type
    const dynamicCmpMap = {
        NoteTxt: <NoteTxt {...props} />,
        NoteImg: <NoteImg {...props} />,
        NoteTodos: <NoteTodos {...props} />
    }
    return dynamicCmpMap[type] || null
}

