const { useEffect, useState } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { noteService } from "../services/note.service"


export function NoteAdd() {
    const [noteToEdit, setNoteToEdit] = useState([])
    // noteService.getEmptyNote('NoteTxt')
    const [isLoading, setIsLoading] = useState(false)
    const [isAddNote, setAddNote] = useState(false)
 




    function onAddNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(() => showSuccessMsg('Note has been successfully add!'))
    }

    function handleChange({ target }) {
        const { name, value } = target
        setNoteToEdit(prev => ({
            ...prev,
            info: { ...prev.info, [name]: value }
        }))
    }

 

    const { title, txt } = noteToEdit.info || {}
    if (!noteToEdit) return <div>load</div>
    return (
        <section className="note-add">
            <h1>note add </h1>
            
            <form onSubmit={onAddNote}>
                <label htmlFor="title">Title</label>
                <input value={title} onChange={handleChange} type="text" name="title" id="title" />

                <label htmlFor="txt">Take a note...</label>
                <input value={txt} onChange={handleChange} type="text" name="txt" id="txt" />
                <div>
                    <button>Save</button>
                    <button type="button">
                    </button>
                </div>
            </form>

        </section>





    )
}
