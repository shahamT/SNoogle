import { LongTxt } from '../../../cmps/general/LongTxt.jsx'


export function NoteTxt({ note }) {
    const { title, txt } = note.info

    return (
        <article className='note-txt'>

            <h3>{title}</h3>
            <p>{txt && <LongTxt txt={txt} />}</p>

        </article>

    )
}