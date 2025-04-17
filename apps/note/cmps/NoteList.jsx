

export function NoteList({ notes }) {




    return <section className="notes-list">
        <ul>
            {notes.map(note =>
                <li key={note.id}>
                    
                </li>
            )}

        </ul>



    </section>
}
