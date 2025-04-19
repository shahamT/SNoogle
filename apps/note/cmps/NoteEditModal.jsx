
const {useState,useEffect,useRef} = React
const {useParams} = ReactRouterDOM

import { noteService } from "../services/note.service.js"

import { NoteTxtModal } from "./NoteTxtModal.jsx"

export function NoteEditModal(){
    
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
    
    if (!note) return <div>Loading...</div>
    return (
        <dialog ref={dialogRef} className="note-dialog">
        <NoteType note={note} />
      </dialog>
    )
}

function NoteType(props) {
    const { note } = props
    const type = note.type
    const dynamicCmpMap = {
        NoteTxt: <NoteTxtModal {...props} />,
        // NoteImg: <NoteImg {...props} />,
        // NoteTodos: <NoteTodos {...props} />
    }
    return dynamicCmpMap[type] || null
}

