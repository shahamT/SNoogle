const { useEffect, useState } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteTodosCreate } from "./NoteTodosCreate.jsx"
// import { NoteTxtCreate } from "./NoteTxtCreate.jsx"
import { NoteUploadImg } from "./NoteUploadImg.jsx"


export function NoteAdd() {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote('NoteTxt'))
    const [isAddTxtNote, setAddTxtNote] = useState()
    const [isAddTodosNote, setAddTodosNote] = useState(false)
    const [isUploadImg, setUploadImg] = useState(false)

    useEffect(() => {

    }, [isAddTxtNote])

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(() => {
                showSuccessMsg('Note has been successfully add!')
                setAddTxtNote(false)
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
        setAddTxtNote(prevStatus => !prevStatus)
        // if (!isAddTxtNote) setNoteToEdit(noteService.getEmptyNote('NoteTxt'))
        // if (isAddTodosNote) return setAddTxtNote(false)
    }

    function createTodoNote() {
        setNoteToEdit(noteService.getEmptyNote('NoteTodos'))
        setAddTodosNote(prevStatus => !prevStatus)
    }

    function onUploadImg() {
        setNoteToEdit(noteService.getEmptyNote('NoteImg'))
        setUploadImg(prevStatus => !prevStatus)

    }
function onClose(){
    setUploadImg(false)
    setAddTodosNote(false)
    // setAddTxtNote(false)

}

    const { title, txt } = noteToEdit.info || {}
    if (!noteToEdit) return <div>load</div>
    return (
        <section className="note-add  ">
            {(!isAddTxtNote) &&
                <div className="note-add-container" >
                  <div onClick={onToggleForm}>Take a note...</div>  
                    <div className="note-add-btns">
                        <button className="note-add-check-btn icon-btn square-check" onClick={createTodoNote}></button>
                        <button className="note-add-check-btn icon-btn image" onClick={onUploadImg}></button>
                    </div>
              
                </div>
            }
            {/* {isAddTxtNote && <NoteTxtCreate setAddTxtNote={setAddTxtNote} onSaveNote={onSaveNote} handleChange={handleChange} />} */}

            {isAddTodosNote && <NoteTodosCreate setAddTodosNote={setAddTodosNote} onSaveNote={onSaveNote} handleChange={handleChange} />}

            {isUploadImg && <NoteUploadImg setUploadImg={setUploadImg} onSaveNote={onSaveNote} handleChange={handleChange} />}


        </section >





    )
}
