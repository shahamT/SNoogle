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
        to,
    } = mail
    console.log("mail: ", mail)
    return (
        <section className="mail-view grid">

            <div className="mail-action-btns">
            <button className="star-btn icon-btn medium star"></button>
            <button className="star-btn icon-btn medium star"></button>
            <button className="star-btn icon-btn medium star"></button>
            <button className="star-btn icon-btn medium star"></button>
            
            </div>

            <div className="mail-content grid">
                <img src="assets/img/mail/default-user.png" className="sender-img" />
                <h2 className="mail-subject">{subject}</h2>

                <div className="details-wraper grid">
                    <p className="mail-from-name">fromname{fromName}</p>
                    <p className="mail-from">{`<${from}>`}</p>
                    <p className="mail-sent-at">{sentAt}</p>
                    <button className="star-btn icon-btn medium star"></button>
                </div>
                <p className="mail-to">to: {to}</p>

                <p className="mail-body">{body}</p>
            </div>

        </section>
    )
}