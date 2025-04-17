import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes,onRemove }) {




    return (
    <section className="note-list grid">
      
            {notes.map(note =>
                    <NotePreview key={note.id} note={note} onRemove={onRemove}/>

            )}

     
    </section>


    )
}
