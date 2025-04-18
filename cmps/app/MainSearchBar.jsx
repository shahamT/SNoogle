// === React

import { mailService } from "../../apps/mail/services/mail.service.js"
import { noteService } from "../../apps/note/services/note.service.js"
import { useEffectUpdate } from "../../custom-hooks/useEffectUpdate.js"
import { getTruthyValues } from "../../services/util.service.js"

// const { useState, useEffect, useRef } = React
const { useState, useEffect } = React
// const { Routes, Route, Navigate, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM
const { useSearchParams, useLocation, useNavigate } = ReactRouterDOM

// === Services

// === Child Components


// ====== Component ======
// =======================

export function MainSearchBar({ /* prop1, prop2 */ }) {
    // === Hooks
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterByToEdit, setfilterByToEdit] = useState(getTruthyValues(getDefaultFilterBy()))
    const [clearBtnVisivility, setClearBtnVisivility] = useState(false)
    // const [isTyping, setIsTyping] = useState(false)

    // === Effects
    useEffect(() => {
        setSearchParams({ ...filterByToEdit, ...searchParams })
        if(filterByToEdit.txt !== ""){
            setClearBtnVisivility(true)
        } else setClearBtnVisivility(false)
    }, [filterByToEdit])


    // useEffectUpdate(() => {
    //     if (pathname.startsWith('/mail/view')) {
    //         navigate(`/mail?txt=${filterByToEdit.txt}`)
    //     }
    // }, [isTyping])



    useEffect(() => {
        setfilterByToEdit(getDefaultFilterBy())
        // setIsTyping(false)
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
        // setIsTyping(true)
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

    function getPlaceholder() {
        if (pathname.startsWith('/mail')) {
            return "Search mail"
        } else if (pathname.startsWith('/notes')) {
            return "Search note"
        }
    }


    function onClearInput() {
        setfilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, txt: "" }))
    }



    // if (!data) return <div>Loading...</div>
    const searchInput = filterByToEdit.txt ? filterByToEdit.txt : ""

    const clearBtnClass = clearBtnVisivility ? "" : "hidden"
    return (
        <div className="main-search-bar">
            <input
                name="txt"
                type="text"
                className="search-input"
                value={searchInput}
                onChange={onSearchChange}
                placeholder={getPlaceholder()} />

            <button className={`clear-search-btn icon-btn x big ${clearBtnClass}`} onClick={onClearInput}></button>
        </div>
    )
}