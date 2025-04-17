import { NotePreview } from "./NotePreview";


export function NoteList({ notes }) {




    return <section className="notes-list">
        <ul>
            {notes.map(note =>
                <li key={note.id}>
                    <NotePreview note={note}/>
                </li>
            )}

        </ul>



    </section>
}
