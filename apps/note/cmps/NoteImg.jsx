
export function NoteImg({ note }) {
    const { title, url } = note.info

    return <article className='note-img'>
        
        <img src={url} alt="" /> 
        <h1>{title}</h1>
        
       
    </article>

}

