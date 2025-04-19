
const { useState, useEffect } = React

export function NoteTxtModal({ note }) {

    const [title, setTitle] = useState('')
    const [txt, setTxt] = useState('')

    useEffect(() => {
        if (note) {
            setTitle(note.info.title || '')
            setTxt(note.info.txt || '')
        }
    }, [note])


    console.log(note)




    // const {title, txt} = note
    if (!note) return <div>Loading...</div>
    return (
<div className="modal-backdrop">
  <form className="modal-window">
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
      <button className="icon-btn" type="reset">Reset</button>
      <button className="icon-btn" type="submit">Save</button>
      <button className="icon-btn" type="button" onClick={() => window.history.back()}>Close</button>
    </div>
  </form>
</div>


        // <form className="add-note-create-container">
        //     {/* <button className="pin-add-btn icon-btn pin" name="isPinned" onClick={handleChange}></button> */}
        //     {/* <input className="add-txt" value={false} onChange={handleChange} type="checkbox" name="checkbox" id="checkbox" /> */}
        //     {/* <input className="add-txt" value={txt} onChange={handleChange} type="txt" name="txt" id="txt" placeholder="List item" /> */}

        //     <button className="add-reset icon-btn " type="reset">Reset edits</button>
        //     <button className="add-submit icon-btn bookmark" type="submit">Save post</button>
        //     <button type="button" >Close</button>

        // </form>


    )

}