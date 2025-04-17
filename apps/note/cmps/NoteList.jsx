import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes,onRemove }) {




    return (
    <section className="note-list ">
      
            {notes.map(note =>
                <div key={note.id} className="note-list-card">
                    <NotePreview note={note}/>
                    <button onClick={()=>onRemove(note.id)}>Delete note</button>

                </div>
            )}

     
    </section>


    )
}
