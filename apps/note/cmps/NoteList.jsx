import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes,onRemove,onSetPin,updateTodo }) {




    return (
    <section className="note-list grid">
      
            {notes.map(note =>
                    <NotePreview key={note.id} note={note} onSetPin={onSetPin} updateTodo={updateTodo} onRemove={onRemove}/>

            )}

     
    </section>


    )
}
