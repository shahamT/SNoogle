// === React
// const { useState, useEffect, useRef } = React
const {useEffect } = React
// const { Routes, Route, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM
const { useNavigate } = ReactRouterDOM


// === Services
import { elapsedTime } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

// === Child Components




// ====== Component ======
// =======================

export function MailPreview({ mail, onMarkRead }) {
    const navigate = useNavigate()


    // === Hooks

    // === Effects
    useEffect(()=>{

    },[mail])

    // === Functions
    function onOpenMail() {
        onMarkRead(mail)
        navigate(`/mail/view/${mail.id}`)
    }

    const {
        from,
        body,
        subject,
        sentAt,
        isRead,
        isStarred,
    } = mail

    const isReadClass = isRead ? "is-read" : ""
    const isStarredClass = isStarred ? "is-Starred" : ""

    return (
        <article className={`mail-preview flex ${isReadClass}`} onClick={onOpenMail}>
            <input type="checkbox" name="" id="" />
            <button className={`star-btn icon-btn medium star ${isStarredClass}`}></button>
            <p className="mail-from">{from}</p>
            <div className="mail-content-wraper grid">
                <p className="mail-subject">{subject}</p>
                <p className="seperator">-</p>
                <p className="mail-body-snippet">snipp</p>
            </div>
            <p className="mail-sent-at">{elapsedTime(sentAt)}</p>

        </article>
    )
}