
const { useState, useEffect } = React
const {useNavigate} = ReactRouterDOM
export function NoteTxtModal({ note,onSaveNoteEdit }) {

    const [title, setTitle] = useState('')
    const [txt, setTxt] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (note) {
            setTitle(note.info.title || '')
            setTxt(note.info.txt || '')
        }
    }, [note])


    console.log(note)


    function handleReset(ev) {
        ev.preventDefault()
        setTitle('')
        // setIsPinned(false)
        setTxt('')
      }


    // const {title, txt} = note
    if (!note) return <div>Loading...</div>
    return (
<div className="modal-backdrop">
  <form className="modal-window"  onSubmit={(ev) => onSaveNoteEdit(ev, {
    ...note,
    info: {
        ...note.info,
        title,
        txt
}})}>
    <input
      className="modal-title"
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Title"
    />

    <textarea
      className="modal-text"
      value={txt}
      onChange={(e) => setTxt(e.target.value)}
      placeholder="Take a note..."
      rows={8}
    />

    <div className="modal-actions">
      <button className="icon-btn" type="reset" onClick={handleReset}>Reset</button>
      <button className="icon-btn" type="submit">Save</button>
      <button className="icon-btn" type="button" onClick={() => navigate('/notes')}>Close</button>
    </div>
  </form>
</div>


    )

}