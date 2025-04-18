// === React

import { mailService } from "../../apps/mail/services/mail.service.js"
import { noteService } from "../../apps/note/services/note.service.js"
import { getTruthyValues } from "../../services/util.service.js"

// const { useState, useEffect, useRef } = React
const { useState, useEffect } = React
// const { Routes, Route, Navigate, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM
const { useSearchParams, useLocation } = ReactRouterDOM

// === Services

// === Child Components


// ====== Component ======
// =======================

export function MailSearchBar({ /* prop1, prop2 */ }) {
    // === Hooks
    const { pathname } = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterByToEdit, setfilterByToEdit] = useState(getTruthyValues(getDefaultFilterBy()))

    // === Effects
    useEffect(() => {

        setSearchParams({ ...filterByToEdit, ...searchParams })

    }, [filterByToEdit])

    useEffect(() => {
        setfilterByToEdit(getDefaultFilterBy())
    }, [pathname])

    // === Functions

    function getDefaultFilterBy() {
        if (pathname.startsWith('/mail')) {
            return mailService.getDefaultFilter()
        } else if (pathname.startsWith('/notes')) {
            return noteService.getDefaultFilter()
        }
    }

    function onSearchChange(target) {
        handleChange(target)
    }


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
        setfilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, [field]: value }))
    }

    // if (!data) return <div>Loading...</div>
    const searchInput = filterByToEdit.txt ? filterByToEdit.txt : ""

    return (
        <section className="mail-search-bar flex">
            <input name="txt" type="text" className="mail-search search-input" value={searchInput} onChange={onSearchChange} />
        </section>
    )
}