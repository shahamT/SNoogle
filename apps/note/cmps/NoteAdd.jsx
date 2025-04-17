const { useEffect, useState } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"


export function NoteAdd() {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote('NoteTxt'))
    const [isLoading, setIsLoading] = useState(false)
    const [isAddNote, setAddNote] = useState()

useEffect(()=>{

},[isAddNote])

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(() => {
                showSuccessMsg('Note has been successfully add!')
                setAddNote(false)
            })
    }



    function handleChange({ target }) {
        const { name, value } = target
        setNoteToEdit(prev => ({
            ...prev,
            info: { ...prev.info, [name]: value }
        }))
    }

    function onToggleForm() {
        setNoteToEdit(noteService.getEmptyNote('NoteTxt'))
        setAddNote(prevIsAddNot => !prevIsAddNot)

        if (!isAddNote) setNoteToEdit(noteService.getEmptyNote('NoteTxt'))
    }



    const { title, txt } = noteToEdit.info || {}
    if (!noteToEdit) return <div>load</div>
    return (
        <section className="note-add  ">
            {(!isAddNote) &&
                <button className="note-add-btn-container" onClick={onToggleForm}>
                    Take a note...
                </button>

            }
            {isAddNote &&
                <form onSubmit={onSaveNote} className="">
                    <label htmlFor="title">Title</label>
                    <input value={title} onChange={handleChange} type="text" name="title" id="title" />

                    <label htmlFor="txt">Take a note...</label>
                    <input value={txt} onChange={handleChange} type="text" name="txt" id="txt" />
                    <div>
                        <button>Save</button>
                        <button type="button">
                        </button>
                    </div>
                </form>}

        </section>





    )
}
