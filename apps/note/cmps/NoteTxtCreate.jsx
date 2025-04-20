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

        <form onSubmit={(ev) => { onSaveNote(ev, noteTxtEdit) }}
            className="add-note-create-container">

            <div className="header flex">
                <input className="add-title clean-input" value={title} onChange={handleChange} type="text" name="title" id="title" placeholder="Title" />
                <button className="pin-add-btn medium icon-btn pin" name="isPinned" onClick={() => setIsPinned(prev => !prev)}></button>
            </div>

            <textarea
                className="note-txt-input clean-input"
                value={txt}
                onChange={handleChange}
                name="txt"
                placeholder="Take a note..."
                rows={4}
                cols={40}
            />

            <div className="action-btns flex">
                <button className="add-reset text-btn" type="reset">Reset</button>
                <button className="add-submit text-btn" type="submit">Save</button>
                <button className="create-close-btn text-btn" type="button" onClick={onClose}>Close</button>
            </div>
        </form>
    )
}