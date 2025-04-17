// === React
// const { useState, useEffect, useRef } = React
// const { Routes, Route, Navigate, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM


// === Services
import { elapsedTime } from "../../../services/util.service.js"

// === Child Components




// ====== Component ======
// =======================

export function MailPreview({ mail }) {
    const {
        from,
        body,
        subject,
        sentAt,
        isRead,
        isStarred,
    } = mail

    // === Hooks

    // === Effects

    // === Functions


const isReadClass = isRead ? "is-read" : ""
const isStarredClass = isStarred ? "is-Starred" : ""
    return (
        <article className={`mail-preview flex ${isReadClass}`}>
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