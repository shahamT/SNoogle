
// === React
// const { Routes, Route, Navigate, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM
const { useState, useEffect, useRef } = React
const { useNavigate, useSearchParams, useParams, useLocation } = ReactRouterDOM

// === Services
import { mailService } from "../services/mail.service.js"
import { useToggle } from "../../../custom-hooks/useToggle.js"

// === Child Components
import { MailSideNav } from "../cmps/MailSideNav.jsx"
import { MailSearchBar } from "../cmps/MailSearchBar.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilterBar } from "../cmps/MailFilterBar.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailView } from "../cmps/MailView.jsx"



// ====== Component ======
// =======================

export function MailIndex() {
    // === Hooks
    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const { status, mailId } = useParams()


    // === Effects

    useEffect(() => {
        setFilterBy(mailService.getFilterFromSearchParams(searchParams))
    }, [searchParams])

    useEffect(() => {
        loadMails()
    }, [filterBy])


    // === Functions

    function loadMails() {
        console.log("filterBy: ", filterBy)
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
                console.log("mails: ", mails)

            })
            .catch(err => console.log("err: ", err))
    }

    function onOpenCompose() {
        setIsComposeOpen(true)
    }

    function onCloseCompose() {
        setIsComposeOpen(false)
    }

    function onMarkRead(mailToSave) {
        mailService.save({ ...mailToSave, isRead: true })
            .then(() => {
                setMails(prevMails => {
                    prevMails.find(mail => mail.id === mailToSave.id).isRead = true
                    return prevMails
                })
            })
            .catch(err => console.log("err: ", err))
    }

    return (
        <section className="mail-index grid">
            <MailSideNav onOpenCompose={onOpenCompose} />
            <MailSearchBar />

            {!mailId &&
                <React.Fragment>
                    <MailList mails={mails} onMarkRead={onMarkRead} />
                    <MailFilterBar />
                </React.Fragment>
            }
            {mailId && <MailView />
            }

            <MailCompose isComposeOpen={isComposeOpen} onCloseCompose={onCloseCompose} />
        </section>
    )
}
