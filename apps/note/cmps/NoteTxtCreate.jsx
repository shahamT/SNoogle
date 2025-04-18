


export function NoteTxtCreate({txt,title,onSaveNote, handleChange,onClose}) {
    // === Hooks

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (

        <form onSubmit={onSaveNote} className="add-note-create-container">
                    <button className="pin-add-btn icon-btn pin" name="isPinned" onClick={handleChange}></button>

                    <label htmlFor="title">
                        <input className="add-title" value={title} onChange={handleChange} type="text" name="title" id="title" placeholder="Title:" />
                    </label>
                    
                    <label className="add-txt" htmlFor="txt">
                        <textarea
                            onChange={handleChange}
                            name="txt"
                            placeholder="Take a note..."
                            rows={4}
                            cols={40} />
                    </label>
                  
                    <button className="add-reset icon-btn " type="reset">Reset edits</button>
                    <button className="add-submit icon-btn bookmark" type="submit">Save post</button>

                    <button type="button" onClick={onClose}>Close</button>
                </form>
    )
}