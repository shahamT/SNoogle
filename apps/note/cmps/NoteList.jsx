// const {useState} = React

// import { NoteEditModal } from "./NoteEditModal.jsx"
import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ onStyleSave, openColorNoteId, setOpenColorNoteId, notes, onRemove, onSetPin, updateTodo, onDuplicate }) {


        return (
                <section className="note-list grid">

                        {notes.map(note =>
                                <NotePreview key={note.id} onStyleSave={onStyleSave} openColorNoteId={openColorNoteId} setOpenColorNoteId={setOpenColorNoteId} note={note} onDuplicate={onDuplicate} onSetPin={onSetPin} updateTodo={updateTodo} onRemove={onRemove} />
                        )}
                       
                     


                </section>


        )
}
