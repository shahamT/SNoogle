// === React
// const { useState, useEffect, useRef } = React
// const { Routes, Route, Navigate, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM

// === Services

// === Child Components
import { Loader } from "../../../cmps/general/Loader.jsx";
import { MailPreview } from "./MailPreview.jsx";


// ====== Component ======
// =======================

export function MailList({ mails , onMarkRead}) {
    // === Hooks

    // === Effects

    // === Functions

    // size = 1,
    // width = 3,
    // speed = 0.8,
    // color = '#fff',
    // type = 'inline',
    // text = '',
    // textSize = 1,
    // textPad = 1,
    // textPos = 'bottom'

    if (!mails) return <Loader size={3} type="cover" />
    return (
        <section className="mail-list flex flex-column" >
            
            {mails.map(mail=> {
                return  <MailPreview key={mail.id} mail={mail} onMarkRead={onMarkRead}/>
            })}


        </section>
    )
}



