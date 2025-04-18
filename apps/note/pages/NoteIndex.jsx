const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM


import { noteService } from '../services/note.service.js'


import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteSideNav } from '../cmps/NoteSideNav.jsx'
import { makeId } from '../../../services/util.service.js'


export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setFilterBy(noteService.getFilterFromSearchParams(searchParams))
    }, [searchParams])

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    // functions
    function loadNotes() {
        noteService.query(filterBy)
            .then(notes => {
                setNotes(notes)
            })


    }

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

    function updateTodo(updatedTodo, index, noteId) {
        noteService.get(noteId)
            .then(note => {
                const todos = [...note.info.todos]
                todos[index] = { ...todos[index], ...updatedTodo }
                note.info.todos = todos
                return noteService.save(note)
            })
            .then(savedNote => {
                setNotes(prev => prev.map(note => note.id === savedNote.id ? savedNote : note))
            })
            .catch(err => console.error('Could not update todo:', err))

    }

    function onDuplicate(noteId) {
        noteService.get(noteId)
            .then(note => {
                const noteDuplicate = { ...note, id: makeId(4) }
                return noteService.post(noteDuplicate)

            })
            .then(savedNote => {
                setNotes(prev => [...prev, savedNote])
            })
            .catch(err => console.error('Could not duplicate note:', err))
    }

    return (
        <div className='note-index grid'>
            <NoteSideNav />
            <NoteAdd />
            <NoteList notes={notes} onRemove={onRemove} onDuplicate={onDuplicate} updateTodo={updateTodo} onSetPin={onSetPin} />


        </div>
    )
}