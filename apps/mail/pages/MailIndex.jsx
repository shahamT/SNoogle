
// === React
// const { useState, useEffect, useRef } = React

import { mailService } from "../services/mail.service.js"

// const { Routes, Route, Navigate, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React
const { useNavigate, useSearchParams } = ReactRouterDOM

// === Services

// === Child Components
import { MailSideNav } from "../cmps/MailSideNav.jsx"
import { MailSearchBar } from "../cmps/MailSearchBar.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilterBar } from "../cmps/MailFilterBar.jsx"



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
                console.log("mails: ", mails)

            })
            .catch(err => console.log("err: ", err))
    }


    // === Functions

    
    return (
        <section className="mail-index grid">
            <MailSideNav/>
            <MailFilterBar/>
            <MailSearchBar/>
            <MailList mails={mails}/>
        </section>
    )
}
