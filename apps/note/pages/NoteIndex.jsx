const { useState, useEffect } = React
const { Link } = ReactRouterDOM


import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'



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
    function onRemove(noteId){
        console.log(noteId)
        noteService.remove(noteId)
        .then(()=>{
            setNotes(prevNotes => prevNotes.filter(note=>noteId !== note.id))
            showSuccessMsg('Note has been successfully removed!')
        })
        .catch(() =>{showErrorMsg('could not remove note') })
    }



    return (
        <div className='note-index'>
            
            <NoteList notes={notes} onRemove={onRemove} />


        </div>
    )
}
