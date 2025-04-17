import { LongTxt } from '../../../cmps/general/LongTxt.jsx'

export function NoteTodos({ note ,updateTodo }) {
    const { title, todos } = note.info

    function onToggleDone(updatedTodo,index) {
        updateTodo(updatedTodo,index,note.id)
    }

    return (
        <article className='note-todos'>

            <h1>{title}</h1>
            <ul className="clean-list">{todos.map((todo, index) => (
                <li key={index} className={(todo.doneAt!==null)?'crossed':''}>
                        <input type="checkbox" name="doneAt" checked={!!todo.doneAt}
                            onChange={change => {
                                const doneAt = change.target.checked ? Date.now() : null
                                onToggleDone({ ...todo, doneAt },index)
                            }} />
                        <label htmlFor={`todo-${index}`}>{todo.txt}</label>     
                </li> )

            )}
            </ul>
        </article>

    )

}