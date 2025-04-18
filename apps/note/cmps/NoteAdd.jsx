const { useEffect, useState } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteUploadImg } from "./NoteUploadImg.jsx"


export function NoteAdd() {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote('NoteTxt'))
    const [isAddNote, setAddNote] = useState()
    const [isUploadImg, setUploadImg] = useState(false)

    useEffect(() => {

    }, [isAddNote])

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

    function createTodoNote() {
        console.log('newNote')
    }

    function onUploadImg() {
        console.log('newImg')
        setUploadImg(prevStatus => !prevStatus)

    }

    const { title, txt } = noteToEdit.info || {}
    if (!noteToEdit) return <div>load</div>
    return (
        <section className="note-add  ">
            {(!isAddNote) &&
                <div className="note-add-btn-container" onClick={onToggleForm}>
                    Take a note...
                    <div className="note-add-btns">
                    <button className="note-add-check-btn icon-btn square-check" onClick={createTodoNote}></button>
                    <button className="note-add-check-btn icon-btn img-uploade" onClick={onUploadImg}></button>
                    </div>
                    {(isUploadImg) && <NoteUploadImg />}
                </div>
            }
            {isAddNote &&
                <form onSubmit={onSaveNote} className="">
                    <label htmlFor="title">
                        <input value={title} onChange={handleChange} type="text" name="title" id="title" placeholder="Title:" />
                    </label>
                    <label htmlFor="txt">
                        <textarea
                            onChange={handleChange}
                            name="txt"
                            placeholder="Take a note..."
                            rows={4}
                            cols={40} />
                    </label>
                    <hr />
                    <button type="reset">Reset edits</button>
                    <button type="submit">Save post</button>
                </form>}

        </section >





    )
}
