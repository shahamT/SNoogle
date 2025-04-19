// === React
// const { useState, useEffect, useRef } = React
const { useEffect, useState } = React
// const { Routes, Route, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM
const { useNavigate, useLocation } = ReactRouterDOM


import { useEffectUpdate } from "../../../custom-hooks/useEffectUpdate.js"
// === Services
import { elapsedTime } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

// === Child Components




// ====== Component ======
// =======================

export function MailPreview({ mail, onMarkRead, onToogleStarred, onToogleChecked, checkedMails }) {
    const navigate = useNavigate()
    const [isChecked, setIsChecked] = useState(getCheckedState())
    // === Hooks

    // === Effects
    useEffect(() => {
    }, [mail])

    useEffect(() => {
        setIsChecked(getCheckedState())
    }, [checkedMails])



    // === Functions
    function onOpenMail() {
        onMarkRead(mail)
        navigate({ pathname: `/mail/view/${mail.id}`, search: location.search })
    }

    function onStarClick(ev) {
        ev.stopPropagation()
        onToogleStarred(mail)
    }

    function onCheckboxClick(ev) {
        ev.stopPropagation()
        onToogleChecked(mail)
    }

    function getCheckedState() {
        // return Array.isArray(checkedMails) && checkedMails.current.includes(mail.id) ? true : false
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
    const isStarredClass = isStarred ? "is-starred" : ""
    const isCheckedClass = isChecked ? "is-checked" : ""

    return (
        <article className={`mail-preview flex ${isReadClass}`} onClick={onOpenMail}>
            <input className={`checkbox mail-checkbox ${isCheckedClass}`} type="checkbox" onClick={onCheckboxClick} />
            <button className={`star-btn icon-btn medium star ${isStarredClass}`} onClick={onStarClick}></button>
            <p className="mail-from">{from}</p>
            <div className="mail-content-wraper grid">
                <p className="mail-subject">{subject}</p>
                <p className="seperator">-</p>
                <p className="mail-body-snippet">{body}</p>
            </div>
            <p className="mail-sent-at">{elapsedTime(sentAt)}</p>

        </article>
    )
}