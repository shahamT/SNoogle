
// === React
// const { Routes, Route, Navigate, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM
const { useState, useEffect, useRef } = React
const { useNavigate, useSearchParams, useParams, useLocation } = ReactRouterDOM

// === Services
import { mailService } from "../services/mail.service.js"
import { useToggle } from "../../../custom-hooks/useToggle.js"
import { useEffectUpdate } from "../../../custom-hooks/useEffectUpdate.js"

// === Child Components
import { MailSideNav } from "../cmps/MailSideNav.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilterBar } from "../cmps/MailFilterBar.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailView } from "../cmps/MailView.jsx"



// ====== Component ======
// =======================

export function MailIndex({ isSideNavPinned }) {
    // === Hooks
    const { pathname } = useLocation()

    const [mails, setMails] = useState(null)
    const [unreadByStatus, setUnreadByStatus] = useState(null)
    const { status, mailId } = useParams()

    const [searchParams, setSearchParams] = useSearchParams()

    const [isComposeOpen, setIsComposeOpen] = useState(false)

    const [checkedMails, setCheckedMails] = useState([])

    // === Effects

    useEffect(() => {
        // 1) figure out which “folder” we’re in
        const m = pathname.match(/^\/mail\/(inbox|starred|draft|trash|unread|sent)/)
        if (!m) return                 // not a mail‑folder route
        const newStatus = m[1]         // "inbox" | "starred" | …

        // 2) clone the real current params
        const filterBy = mailService.getFilterFromSearchParams(searchParams)

        // 4) merge in the new one and write
        filterBy.status = newStatus
        setSearchParams(filterBy)
        loadMails(filterBy)
    }, [pathname, searchParams, setSearchParams])


    useEffect(() => {
        loadUnreadByStatus()
    }, [])

    // === Functions

    function loadMails(filterBy) {
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
                console.log("mails: ", mails)
            })
            .catch(err => console.log("err: ", err))
    }

    function loadUnreadByStatus() {
        mailService.getUnreadByStatus()
            .then(res => {
                setUnreadByStatus(res)
                console.log("res: ", res)
            })

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
                loadUnreadByStatus()
            })
            .catch(err => console.log("err: ", err))
    }


    function onToogleStarred(mailToStar) {
        const boolean = mailToStar.isStarred

        setMails(prevMails => {
            prevMails.find(mail => mail.id === mailToStar.id).isStarred = !boolean
            return [...prevMails]
        })

        mailService.save({ ...mailToStar, isStarred: !boolean })
            .then(() => {
                loadUnreadByStatus()
            })
            .catch(err => {
                console.log("err: ", err)
                setMails(prevMails => {
                    prevMails.find(mail => mail.id === mailToStar.id).isStarred = boolean
                    return [...prevMails]
                })
            })
    }

    function onToogleChecked(mailToCheck) {
        console.log("checkedMails: ", checkedMails)
        if (!checkedMails.includes(mailToCheck.id)){
            setCheckedMails(prevChecked => prevChecked.push(mailToCheck.id))
        }else {
            const idIdx = checkedMails.current.findIndex(id=> id === mailToCheck.id)
            setCheckedMails(prevChecked => prevChecked.splice(mailToCheck.id,1))
        }
 

    }


    return (
        <section className="mail-index grid">
            <MailSideNav
                onOpenCompose={onOpenCompose}
                isSideNavPinned={isSideNavPinned}
                unreadByStatus={unreadByStatus}
            />

            {!mailId &&
                <React.Fragment>
                    <MailList
                        mails={mails}
                        onMarkRead={onMarkRead}
                        onToogleStarred={onToogleStarred}
                        onToogleChecked={onToogleChecked}
                        checkedMails={checkedMails}
                    />
                    <MailFilterBar />
                </React.Fragment>
            }
            {mailId && <MailView />
            }

            <MailCompose
                isComposeOpen={isComposeOpen}
                onCloseCompose={onCloseCompose}
            />
        </section>
    )
}
