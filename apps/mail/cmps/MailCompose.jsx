// === React
const { useState, useEffect, useRef } = React
// const { Routes, Route, Navigate, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM
const { useParams } = ReactRouterDOM


// === Services
import { mailService } from "../services/mail.service.js"

// === Child Components




// ====== Component ======
// =======================

export function MailCompose({ isComposeOpen, onCloseCompose }) {
    // === Hooks
    const [mail, setMail] = useState(mailService.getEmptyMail())
    const [mailToEdit, setMailToEdit] = useState({ ...mail })
    const { mailId, NoteAppMail } = useParams()

    // === Effects
    useEffect(() => {
        if (mailId) {
            mailService.get(mailId)
                .then(mail => {
                    setMail(mail)
                })
        }

        // else if (NoteAppMail) {
        //     mailService.get(mailId)
        //         .then(mailContent => {
        //             setMailToEdit({ ...mailContent })
        //         })
        // }

    }, [])

    // === Functions

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setMailToEdit(prevMail => ({ ...prevMail, [field]: value }))
    }



    function onSend(ev) {
        ev.preventDefault()

        mailToEdit.sentAt = Date.now()

        SaveMail(mailToEdit)
            .then(mail => {
                onCloseCompose()
                showSuccessMsg(`Email was sent to${mail.to}`)
            })
            .catch(err => {
                console.log("err: ", err)
                showErrorMsg(`somthing went wrong ${err}`)
            })
    }

    function SaveMail(mailToSave) {
        return mailService.save(mailToSave)
    }

    if (!isComposeOpen) return ''

    const {
        to,
        subject,
        body

    } = mailToEdit

    return (
        <div className="mail-compose grid">
            <div className="compose-header flex space-between align-center">
                <p className="compose-title">New Message</p>
                <button className="close-btn" onClick={onCloseCompose}>close</button>

            </div>
            <form className="compose-form grid" onSubmit={onSend}>
                <input className="to-input clean-input" type="text" name="to" value={to} onChange={handleChange} placeholder="To" />
                <input className="subject-input clean-input" type="text" name="subject" value={subject} onChange={handleChange} placeholder="Subject" />
                <textarea className="body-input clean-input" type="text" name="body" value={body} onChange={handleChange} placeholder=""></textarea>
                <div className="action-btns flex">
                    <button className="send-btn">Send</button>
                    <button type="button" className="discard-btn">delete</button>
                </div>
            </form>
        </div>
    )
}