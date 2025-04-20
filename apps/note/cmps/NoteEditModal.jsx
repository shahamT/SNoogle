
const {useState,useEffect,useRef} = React
const {useParams,useNavigate} = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteTodosModal } from "./NoteTodosModal.jsx"

import { NoteTxtModal } from "./NoteTxtModal.jsx"

export function NoteEditModal(){
    const navigate = useNavigate()
    
    const dialogRef = useRef()
    const {noteId} = useParams()
    const[note,setNote] = useState(null)
    
    useEffect(()=>{
        loadNote()
    },[noteId])

    useEffect(()=>{
        if(note) dialogRef.current.showModal()
    },[note])

    function loadNote(){
        noteService.get(noteId)
        .then(note=>setNote(note))
        .catch(err => console.log('err:', err))
    }

    function onSaveNoteEdit(ev, note) {
        ev.preventDefault()
        noteService.save(note)
            .then(() => {
                console.log("save note EDIT:",note)
                showSuccessMsg('Note has been successfully save!')
            })
            .finally(onClose)
    }

    function handleReset(ev) {
        ev.preventDefault()
        setCurrTitle('')
        setIsPinned(false)
        setTodos([{ txt: '', doneAt: null }])
      }

    
    function onClose() {
        navigate(-1)
    }

    
    if (!note) return <div>Loading...</div>
    return (
        <dialog ref={dialogRef} className="note-dialog">
        <NoteType note={note} onSaveNoteEdit={onSaveNoteEdit} onClose={onClose} />
      </dialog>
    )
}

function NoteType(props) {
    const { note } = props
    const type = note.type
    const dynamicCmpMap = {
        NoteTxt: <NoteTxtModal {...props} />,
        NoteTodos: <NoteTodosModal {...props} />
        // NoteImg: <NoteImg {...props} />,
    }
    return dynamicCmpMap[type] || null
}

