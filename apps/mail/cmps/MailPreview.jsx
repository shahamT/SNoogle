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

export function MailPreview({
    mail,
    onMarkRead,
    onToogleStarred,
    onToogleChecked,
    checkedMails,
    onRemoveMail,
    onMarkUnRead,
    addParam }) {

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
        if (!mail.sentAt) {
            addParam('compose', mail.id)
            return
        }

        onMarkRead(mail)
        navigate({ pathname: `/mail/view/${mail.id}`, search: location.search })
    }

    function handleToogleStarred(ev) {
        ev.stopPropagation()
        onToogleStarred(mail)
    }

    function handleToogleChecked(ev) {
        ev.stopPropagation()
        onToogleChecked(mail)
    }

    function handleRemoveMail(ev) {
        ev.stopPropagation()
        onRemoveMail(mail)
    }

    function handleMarkUnRead(ev) {
        ev.stopPropagation()
        onMarkUnRead(mail)
    }

    function handleMarkRead(ev) {
        ev.stopPropagation()
        onMarkRead(mail)
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
            <input className={`checkbox mail-checkbox ${isCheckedClass}`} type="checkbox" onClick={handleToogleChecked} />
            <button className={`star-btn icon-btn medium star ${isStarredClass}`} onClick={handleToogleStarred}></button>
            <p className="mail-from">{from}</p>
            <div className="mail-content-wraper grid">
                <p className="mail-subject">{subject}</p>
                <p className="seperator">-</p>
                <p className="mail-body-snippet">{body}</p>
            </div>
            <p className="mail-sent-at">{elapsedTime(sentAt)}</p>
            <div className="mail-action-btns">
                <button className="delete-btn icon-btn medium trash-can-regular" onClick={handleRemoveMail}></button>
                {isRead && <button className="mark-unread-btn icon-btn medium envelope" onClick={handleMarkUnRead}></button>}
                {!isRead && <button className="mark-read-btn icon-btn medium envelope-open" onClick={handleMarkRead}></button>}
            </div>

        </article>
    )
}

