// === React
// const { useState, useEffect, useRef } = React

import { mailService } from "../services/mail.service.js"

// const { Routes, Route, Navigate, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

// === Services

// === Child Components




// ====== Component ======
// =======================

export function MailView() {
    // === Hooks
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()
    // === Effects
    useEffect(() => {
        LoadMail()
    }, [mailId])

    // === Functions

    function LoadMail() {
        mailService.get(mailId)
            .then(mail => setMail(mail))
            .catch(err => console.log("err: ", err))
    }

    if (!mail) return <div>Loading...</div>

    const {
        from,
        fromName,
        body,
        subject,
        sentAt,
        isStarred,
    } = mail
    console.log("mail: ", mail)
    return (
        <section className="mail-view">
            
            <div className="mail-action-btns">

            </div>

            <div className="mail-content">

                <h2 className="mail-subject">{subject}</h2>
                <p className="mail-from-name">{fromName}</p>
                <p className="mail-from">{`<${from}>`}</p>
                <p className="mail-body">{body}</p>
                <p className="mail-sent-at">{sentAt}</p>
            </div>

        </section>
    )
}