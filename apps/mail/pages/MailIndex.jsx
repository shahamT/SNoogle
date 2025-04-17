
// === React
// const { useState, useEffect, useRef } = React

import { mailService } from "../services/mail.service.js"

// const { Routes, Route, Navigate, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React
const { useNavigate, useSearchParams } = ReactRouterDOM

// === Services

// === Child Components



// ====== Component ======
// =======================

export function MailIndex() {
    // === Hooks
    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    // === Effects
    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
                // console.log("mails: ", mails)

            })
            .catch(err => console.log("err: ", err))
    }


    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <h1>mail-index</h1>
        </section>
    )
}
