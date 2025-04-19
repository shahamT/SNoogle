
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
    const [searchParams, setSearchParams] = useSearchParams()
    const { status, mailId } = useParams()


    const [mails, setMails] = useState(null)
    const [unreadByStatus, setUnreadByStatus] = useState(null)

    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [checkedMails, setCheckedMails] = useState([])

    const [updateList, setUpdateList] = useState(null)

    // === Effects

    useEffect(() => {
        const m = pathname.match(/^\/mail\/(inbox|starred|draft|trash|unread|sent)/)
        console.log("m: ", m)
        if (!m) return
        const newStatus = m[1]

        const params = addParam('status', newStatus) //TODO fix this
        loadMails(params)
    }, [pathname, searchParams, setSearchParams])

    //opens the compose based on url
    useEffect(() => {
        const composeParam = searchParams.get('compose')
        setIsComposeOpen(composeParam)
    }, [searchParams])

    useEffect(() => {
        loadUnreadByStatus()
    }, [])

    useEffectUpdate(() => {
        loadMails(mailService.getParamsFromSearchParams(searchParams))
    }, [updateList])

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
            })

    }

    function addParam(key, value) {
        const params = mailService.getParamsFromSearchParams(searchParams)
        params[key] = value
        setSearchParams(params)
        return params
    }

    function toggleComposeState() {
        const params = mailService.getParamsFromSearchParams(searchParams)
        if (params.compose === 'new') {
            setIsComposeOpen(true)
        } else setIsComposeOpen(false)
    }

    function onOpenCompose() {
        addParam('compose', 'new')
    }

    function onCloseCompose() {
        addParam('compose', '')
    }

    function saveDraft(draft) {
        if (!draft.subject) draft.subject = '(no subject)'
        draft.isRead = true
        mailService.save(draft)
            .then(mail => {
                console.log("mail: ", mail)
                addParam('compose', mail.id)
            })
    }

    // ==== mail action ====

    function onMarkRead(mailToMark) {
        setMails(prevMails => {
            prevMails.find(mail => mail.id === mailToMark.id).isRead = true
            return [...prevMails]
        })

        mailService.save({ ...mailToMark, isRead: true })
            .then(() => {
                setMails(prevMails => {
                    prevMails.find(mail => mail.id === mailToMark.id).isRead = true
                    return prevMails
                })
                loadUnreadByStatus()
                showSuccessMsg(`Marked as 'Read'`)

            })
            .catch(err => {
                console.log("err: ", err)
                setMails(prevMails => {
                    prevMails.find(mail => mail.id === mailToMark.id).isRead = false
                    return [...prevMails]
                })
            })
    }

    function onMarkUnRead(mailToMark) {
        setMails(prevMails => {
            prevMails.find(mail => mail.id === mailToMark.id).isRead = false
            return [...prevMails]
        })

        mailService.save({ ...mailToMark, isRead: false })
            .then(() => {
                setMails(prevMails => {
                    prevMails.find(mail => mail.id === mailToMark.id).isRead = false
                    return prevMails
                })
                loadUnreadByStatus()
                showSuccessMsg(`Marked as 'Unread'`)

            })
            .catch(err => {
                console.log("err: ", err)
                setMails(prevMails => {
                    prevMails.find(mail => mail.id === mailToMark.id).isRead = true
                    return [...prevMails]
                })
            })
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
                if (pathname.startsWith('/mail/starred')) {
                    setUpdateList(Date.now())
                }
            })
            .catch(err => {
                console.log("err: ", err)
                setMails(prevMails => {
                    prevMails.find(mail => mail.id === mailToStar.id).isStarred = boolean
                    return [...prevMails]
                })
            })
    }

    function onRemoveMail(mailToRemove) {
        const timeStamp = Date.now()
        setMails(prevMails => prevMails.filter(mail => mail.id !== mailToRemove.id))
        if (!mailToRemove.removedAt) {
            mailService.save({ ...mailToRemove, removedAt: timeStamp })
                .then(() => {
                    loadUnreadByStatus()
                    showSuccessMsg('Mail was moved to trash folder')
                })
                .catch(err => {
                    console.log("err: ", err)
                    setMails(prevMails => {
                        prevMails.push(mailToRemove)
                        showErrorMsg('Somthing went wrong! mail could not be removed')
                    })
                })
        } else {
            mailService.remove(mailToRemove.id)
                .then(() => {
                    loadUnreadByStatus()
                    showSuccessMsg('Mail was deleted')
                })
                .catch(err => {
                    console.log("err: ", err)
                    setMails(prevMails => {
                        prevMails.push(mailToRemove)
                        showErrorMsg('Somthing went wrong! mail could not be deleted')
                    })
                })
        }

    }

    function onToogleChecked(mailToCheck) {
        // console.log("checkedMails: ", checkedMails)
        // if (!checkedMails.includes(mailToCheck.id)){
        //     setCheckedMails(prevChecked => prevChecked.push(mailToCheck.id))
        // }else {
        //     const idIdx = checkedMails.current.findIndex(id=> id === mailToCheck.id)
        //     setCheckedMails(prevChecked => prevChecked.splice(mailToCheck.id,1))
        // }
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
                        onRemoveMail={onRemoveMail}
                        onMarkUnRead={onMarkUnRead}
                        addParam={addParam}
                    />
                    <MailFilterBar />
                </React.Fragment>
            }
            {mailId && <MailView />
            }

            <MailCompose
                isComposeOpen={isComposeOpen}
                onCloseCompose={onCloseCompose}
                saveDraft={saveDraft}
            />
        </section>
    )
}
