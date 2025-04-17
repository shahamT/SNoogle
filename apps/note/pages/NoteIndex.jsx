const { useState, useEffect } = React
const { Link } = ReactRouterDOM


import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        noteService.query(filterBy)
            .then(setNotes)
    }, [filterBy])




    return (
        <div className='notes-container'>
            <NoteList notes={notes} />

        </div>
    )
}
