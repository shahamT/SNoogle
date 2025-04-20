

export function AddNoteCollapsed({onAddNoteTypeChange}) {
    return <div className="note-add-container" >
        <div onClick={()=>onAddNoteTypeChange('addText') } className="add-text-note-btn">Take a note...</div>
        <div className="note-add-btns">
            <button className="note-add-check-btn icon-btn square-check" onClick={()=>onAddNoteTypeChange('addToDo')}></button>
            <button className="note-add-check-btn icon-btn image" onClick={()=>onAddNoteTypeChange('addImg')}></button>
        </div>
    </div>
}