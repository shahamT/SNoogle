// === React
const { useState } = React
// const { Routes, Route, Navigate, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM

// === Services

// === Child Components



// ====== Component ======
// =======================

export function NoteImgCreate({ onSaveNote, onClose }) {
  // === Hooks
  const [title, setTitle] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [isPinned, setIsPinned] = useState(false)



  // === Effects

  // === Functions
  function handleFileUpload(ev) {
    const file = ev.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setImgUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  function handleSubmit(ev) {
    ev.preventDefault()

    const note = {
      type: 'NoteImg',
      info: {
        title,
        url: imgUrl
      },
      isPinned,
      style: { backgroundColor: '#ffffff' }
    }

    onSaveNote(ev, note)
  }

  function handleTitleChange(ev) {
    setTitle(ev.target.value)
}

  function handleReset(ev) {
    ev.preventDefault()
    setTitle('')
    setImgUrl('')
    setIsPinned(false)
  }



  // if (!data) return <div>Loading...</div>
  return (
    <form className="add-note-create-container" onSubmit={handleSubmit}>
      <button type="button" className="pin-add-btn icon-btn pin" onClick={() => setIsPinned(prev => !prev)}></button>
      <input
        className="add-title"
        value={title}
        onChange={handleTitleChange}
        type="text"
        name="title"
        placeholder="Title:"
      />

<label className="img-upload-btn icon-btn">
  Upload Image
  <input type="file" accept="image/*" onChange={handleFileUpload} hidden />
</label>
      {imgUrl && <img src={imgUrl} alt="Uploaded preview" style={{ maxWidth: '100%' }} />}


      <button className="add-reset icon-btn" type="reset" onClick={handleReset}>Reset</button>
      <button className="add-submit icon-btn bookmark" type="submit">Save</button>
      <button className="create-close-btn icon-btn" type="button" onClick={onClose}>Close</button>


    </form>
  )
}