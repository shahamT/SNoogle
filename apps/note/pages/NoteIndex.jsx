const { useState, useEffect } = React
const { Link, useSearchParams, useLocation, useNavigate } = ReactRouterDOM


import { noteService } from '../services/note.service.js'
import { makeId } from '../../../services/util.service.js'


// import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteSideNav } from '../cmps/NoteSideNav.jsx'
import { AddNoteCollapsed } from '../cmps/AddNoteCollapsed.jsx'
import { NoteTodosCreate } from '../cmps/NoteTodosCreate.jsx'
import { NoteTxtCreate } from '../cmps/NoteTxtCreate.jsx'



export function NoteIndex({ isSideNavPinned }) {
    const { pathname } = useLocation()
    const navigate = useNavigate()


    const [notes, setNotes] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(null)
    const [openColorNoteId, setOpenColorNoteId] = useState(null)


    const [noteToEdit,setNoteToEdit] = useState(noteService.getEmptyNote())

    const [addNoteType, setAddNoteType] = useState('collapsed')

    // useEffect(() => {
    //    addParams([{ addNoteType: addNoteType }])
    // }, [])

    useEffect(() => {

        const m = pathname.match(/^\/notes\/(todos|images|archive|trash|main)/)
        if (!m) return
        const newStatus = m[1]

        addParams([{ addNoteType: addNoteType }, { status: newStatus }])

    }, [pathname])

    useEffect(() => {
        const addNoteTypeParam = searchParams.get('addNoteType')
        setAddNoteType(addNoteTypeParam)
        loadNotes(noteService.getFilterFromSearchParams(searchParams))
    }, [searchParams])

    useEffect(() => {
        const noteType = searchParams.get('addNoteType')
        let noteTypeKey
        switch (noteType) {
            case 'addText':
                noteTypeKey = 'NoteTxt'
                break
            case 'addToDo':
                noteTypeKey = 'NoteTodos'
                break
            case 'addImg':
                noteTypeKey = 'NoteImg'
                break
            default:
                noteTypeKey = 'NoteTxt'
        }

        setNoteToEdit(noteService.getEmptyNote(noteTypeKey))
    }, [searchParams])


    // functions
    function loadNotes(params) {
        noteService.query(params)
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
                _
                setNotes(prev => [...prev, savedNote])
            })
            .catch(err => console.error('Could not duplicate note:', err))
    }



    function onSaveNote(ev, noteToEdit) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(() => {
                console.log("save note:",notes)
                showSuccessMsg('Note has been successfully add!')
            })
            .finally(onClose)
    }

    function onStyleSave(noteToUpdate){
        noteService.save(noteToUpdate)
            .then(() => {
                console.log("save note:",notes)
                showSuccessMsg('Note has been successfully add!')
            })
            .finally(onClose)
    }


    function onAddNoteTypeChange(type) {
        addParams([{ addNoteType: type }])
    }

    function addParams(keys) {
        console.log("keys: ", keys)
        const params = noteService.getFilterFromSearchParams(searchParams)
        keys.forEach(key => {
            const k = Object.keys(key)[0]
            const v = key[k]
            params[k] = v
        })
        setSearchParams(params)
        return params
    }


    function onClose() {
        navigate('/notes/main')
    }

    return (
        <div className='note-index grid'>
            <NoteSideNav isSideNavPinned={isSideNavPinned} />

            <section className="note-add  ">
                <NoteAdd addNoteType={addNoteType} noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit} onAddNoteTypeChange={onAddNoteTypeChange} onSaveNote={onSaveNote} onClose={onClose} />
            </section >

            <NoteList onStyleSave={onStyleSave} notes={notes}  openColorNoteId={openColorNoteId} setOpenColorNoteId={setOpenColorNoteId} onRemove={onRemove} onDuplicate={onDuplicate} updateTodo={updateTodo} onSetPin={onSetPin} />

        </div>
    )
}



function NoteAdd(props) {
    const { addNoteType } = props
    const dynamicCmpMap = {
        collapsed: <AddNoteCollapsed {...props} />,
        addText: <NoteTxtCreate {...props} />,
        addToDo: <NoteTodosCreate {...props} />
    }
    if (!addNoteType) return dynamicCmpMap.collapsed
    return dynamicCmpMap[addNoteType]
}
