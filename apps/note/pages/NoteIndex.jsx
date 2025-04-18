const { useState, useEffect } = React
const { Link } = ReactRouterDOM


import { noteService } from '../services/note.service.js'


import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteSideNav } from '../cmps/NoteSideNav.jsx'


export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())


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
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => noteId !== note.id))
                showSuccessMsg('Note has been successfully removed!')
            })
            .catch(() => { showErrorMsg('could not remove note') })
    }


    function onSetPin(noteId) {
        noteService.get(noteId)
            .then(note => {
                note.isPinned = !note.isPinned
                return noteService.save(note)
            })
            .then(savedNote => {
                setNotes(prevNotes => {
                    const newNotes = prevNotes
                        .map(note =>
                            note.id === savedNote.id ? { ...savedNote } : note)
                                .sort((a, b) => (b.isPinned === true) - (a.isPinned === true))
                                return newNotes
                            }
                        )
                        .catch(err => console.error('Could not toggle pin:', err))
                    })

    }




    return (
        <div className='note-index grid'>
            <NoteSideNav />
            <NoteAdd />
            <NoteList notes={notes} onRemove={onRemove} onSetPin={onSetPin} />


        </div>
    )
}