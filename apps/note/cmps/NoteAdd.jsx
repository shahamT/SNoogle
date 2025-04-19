// const { useEffect, useState } = React
// const { useNavigate, useParams, Link , useSearchParams } = ReactRouterDOM

// import { noteService } from "../services/note.service.js"
// import { AddNoteCollapsed } from "./AddNoteCollapsed.jsx"
// import { NoteTodosCreate } from "./NoteTodosCreate.jsx"
// // import { NoteTxtCreate } from "./NoteTxtCreate.jsx"
// import { NoteUploadImg } from "./NoteUploadImg.jsx"


// export function NoteAdd() {
//     const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote('NoteTxt'))
//     const [addNoteType, setAddNoteType] = useState('collapsed')


//     const [searchParams, setSearchParams] = useSearchParams()


//     useEffect(() => {

//     }, [isAddTxtNote])

//     function onSaveNote(ev) {
//         ev.preventDefault()
//         noteService.save(noteToEdit)
//             .then(() => {
//                 showSuccessMsg('Note has been successfully add!')
//                 setAddTxtNote(false)
//             })
//     }

//     function handleChange({ target }) {
//         const { name, value } = target
//         setNoteToEdit(prev => ({
//             ...prev,
//             info: { ...prev.info, [name]: value }
//         }))
//     }


//     function onClose() {
//         setUploadImg(false)
//         setAddTodosNote(false)
//         // setAddTxtNote(false)
//     }

//     function onAddNoteTypeChange(type){
//         addParam('addNoteType', type) 
//     }
   
//     function addParam(key, value) {
//         const params = noteService.getFilterFromSearchParams(searchParams)
//         params[key] = value
//         setSearchParams(params)
//         return params
//     }

//     const { title, txt } = noteToEdit.info || {}
//     if (!noteToEdit) return <div>load</div>
//     return (
//         <section className="note-add  ">
//             <AddNoteDynamic addNoteType={addNoteType} onAddNoteTypeChange={onAddNoteTypeChange} setAddTxtNote={setAddTxtNote} onSaveNote={onSaveNote} handleChange={handleChange}/>
//         </section >
//     )
// }

// function AddNoteDynamic({addNoteType, onAddNoteTypeChange}) {
//     const dynamicCmpMap = {
//         collapsed: <AddNoteCollapsed onAddNoteTypeChange={onAddNoteTypeChange}/>,
//         // addText: <NoteTxtCreate setAddTxtNote={setAddTxtNote} onSaveNote={onSaveNote} handleChange={handleChange}/>,
//         addToDo: <NoteTodosCreate onAddNoteTypeChange={onAddNoteTypeChange} />
//     }
//     return dynamicCmpMap[addNoteType]
// }


