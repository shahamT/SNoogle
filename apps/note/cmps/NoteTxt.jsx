const { useParams, useNavigate } = ReactRouterDOM


import { LongTxt } from '../../../cmps/general/LongTxt.jsx'



export function NoteTxt({ note }) {
    const { title, txt } = note.info
    const navigate = useNavigate()

    return (
        <article className='note-txt'
        // onClick={() => navigate(`/notes/edit/${note.id}`)}
        // style={{ cursor: 'pointer' }}
      >

            <h3>{title}</h3>
            <p>{txt && <LongTxt txt={txt} />}</p>

        </article>

    )
}