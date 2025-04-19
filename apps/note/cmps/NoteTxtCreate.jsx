import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { Routes, Route, useNavigate } = ReactRouterDOM

export function NoteTxtCreate({ onSaveNote, handleChange, onClose, noteToEdit }) {
    // === Hooks
    const navigate = useNavigate()
    const [noteTxtEdit, setNoteTxtEdit] = useState(noteToEdit)


    useEffect(() => {
        setNoteTxtEdit(noteToEdit)
    }, [noteToEdit])

    function handleChange({ target }) {
        const { name, value } = target
        setNoteTxtEdit(prev => ({
            ...prev,
            info: { ...prev.info, [name]: value }
        }))
    }




    const { title, txt } = noteTxtEdit.info
    console.log(noteTxtEdit.info)
    // if (!noteTxtEdit.info) return <div>Loading...</div>
    return (

        <form onSubmit={(ev) => {onSaveNote(ev, noteTxtEdit)}}
         className="add-note-create-container">
            <button className="pin-add-btn icon-btn pin" name="isPinned" onClick={handleChange}></button>

            <label htmlFor="title">
                <input className="add-title" value={title} onChange={handleChange} type="text" name="title" id="title" placeholder="Title:" />
            </label>

            <label className="add-txt" htmlFor="txt">
                <textarea
                    value={txt}
                    onChange={handleChange}
                    name="txt"
                    placeholder="Take a note..."
                    rows={4}
                    cols={40} />
            </label>

            <button className="add-reset icon-btn " type="reset">Reset edits</button>
            <button className="add-submit icon-btn bookmark" type="submit">Save post</button>

            <button className="create-close-btn icon-btn" type="button" onClick={onClose}>Close</button>
        </form>
    )
}