
const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM
export function NoteTodosModal({ note, onSaveNoteEdit }) {

    const [title, setTitle] = useState('')
    const [todos, setTodos] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        if (note) {
            setTitle(note.info.title || '')
            setTodos(note.info.todos || [])
            console.log("d",todos)
        }
    }, [note])


    function handleChangeTodo(value, idx) {
        const updated = [...todos]
        updated[idx].txt = value
        setTodos(updated)
    }

    function onAddTodo() {
        setTodos([...todos, { txt: '', doneAt: null }])
    }

    function onRemoveTodo(idx) {
        setTodos(prev => prev.filter((_, i) => i !== idx))
    }

    
    function handleReset(ev) {
        ev.preventDefault()
        setTitle('')
        // setIsPinned(false)
        setTodos([{ txt: '', doneAt: null }])
      }

    if (!note) return <div>Loading...</div>

    return (
        <div className="modal-backdrop" >
            <form className="modal-window" onSubmit={(ev)=>onSaveNoteEdit(ev, {
            ...note,
            info: {
                ...note.info,
                title,
                todos
        }})}>
                <input
                    className="modal-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />

                <section className="modal-todos-list">
                    {todos.map((todo, idx) => (
                        <div key={idx} className="modal-todo-line">
                            <input
                                type="text"
                                value={todo.txt}
                                onChange={(e) => handleChangeTodo(e.target.value, idx)}
                                placeholder={`Todo #${idx + 1}`}
                            />
                            <button type="button" onClick={() => onRemoveTodo(idx)}>X</button>
                        </div>
                    ))}
                    <button type="button" onClick={onAddTodo}>+ Add Todo</button>
                </section>

                <div className="modal-actions">
                    <button className="icon-btn" type="reset" onClick={handleReset}>Reset</button>
                    <button className="icon-btn" type="submit">Save</button>
                    <button className="icon-btn" type="button" onClick={() => navigate('/notes')}>Close</button>
                </div>
            </form>
        </div>


    )

}