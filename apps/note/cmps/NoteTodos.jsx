import { LongTxt } from '../../../cmps/general/LongTxt.jsx'

export function NoteTodos({ note }) {
    const { title, todos } = note.info

    return (
        <article className='note-todos'>

        <h1>{title}</h1>
        <ul>{todos.map((todo) => {
            <li>
                <input type="checkbox" name="doneAt" checked={!!todo.doneAt} onChange={() => ({ ...todo, doneAt: e.target.checked ? Date.now() : null })}
                 />
                {todo.txt}
            </li>
        }

        )}
        </ul>


    </article>



    )

}