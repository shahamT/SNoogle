const { useState, useEffect } = React
const { Link } = ReactRouterDOM


import { noteService } from '../services/note.service.js'


import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteSideNav } from '../cmps/NoteSideNav.jsx'


export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [isAddNote, setIsAddNote] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState([])

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy)
            .then(notes => {
                setNotes(notes)
                console.log("variable: ", notes)
            })


    }



    // functions
    function onRemove(noteId) {
        console.log(noteId)
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => noteId !== note.id))
                showSuccessMsg('Note has been successfully removed!')
            })
            .catch(() => { showErrorMsg('could not remove note') })
    }

    function onToggleForm() {
        setNoteToEdit(noteService.getEmptyNote('NoteTxt'))
        setIsAddNote(prevIsAddNot => !prevIsAddNot)
    }





    return (
        <div className='note-index grid'>
            <NoteSideNav />
            <button className="note-add-btn-container" onClick={onToggleForm}>
                Take a note...
                {isAddNote && <NoteAdd />}
            </button>
            <NoteList notes={notes} onRemove={onRemove} />


        </div>
    )
}