// === React

import { mailService } from "../services/mail.service.js"

// const { useState, useEffect, useRef } = React
const { useState, useEffect } = React
// const { Routes, Route, Navigate, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM
const { useSearchParams } = ReactRouterDOM

// === Services

// === Child Components




// ====== Component ======
// =======================

export function MailFilterBar({
    initialStart = '',
    initialEnd = '',
    onRangeChange
}) {
    // === Hooks
    const [searchParams, setSearchParams] = useSearchParams()

    const [startDate, setStartDate] = useState(initialStart)
    const [endDate, setEndDate] = useState(initialEnd)

    // === Effects
    useEffect(() => {
        const fromParam = searchParams.get('filterfrom')
        const toParam = searchParams.get('filterto')
        setStartDate(fromParam)
        setEndDate(toParam)
    }, [searchParams])

    // === Functions


    function addParams(keys) {
        console.log("keys: ", keys)
        const params = mailService.getParamsFromSearchParams(searchParams)
        keys.forEach(key => {
            const k = Object.keys(key)[0]
            const v = key[k]
            params[k] = v
        })
        setSearchParams(params)
        return params
    }

    // function addParam(key, value) {
    //     const params = mailService.getParamsFromSearchParams(searchParams)
    //     params[key] = value
    //     setSearchParams(params)
    //     return params
    // }

    function handleStartChange(ev) {
        const newStart = ev.target.value
        const newEnd = endDate && newStart > endDate ? newStart : endDate

        setStartDate(newStart)
        setEndDate(newEnd)
        addParams([{ filterfrom: newStart }, { filterto: newEnd }])
    }

    function onClearStartDate() {
        setStartDate(null)
        addParams([{ filterfrom: undefined }])
    }

    function handleEndChange(ev) {
        const newEnd = ev.target.value
        const newStart = startDate && newEnd < startDate ? newEnd : startDate

        setStartDate(newStart)
        setEndDate(newEnd)
        addParams([{ filterfrom: newStart }, { filterto: newEnd }])
    }

    function onClearEndDate() {
        setEndDate(null)
        addParams([{ filterto: undefined }])
    }


    // if (!data) return <div>Loading...</div>
    return (
        <section className="mail-filter-bar flex space-between">
            <div className="action-btns flex">
                <label className="checkbox-wrapper">
                    <input type="checkbox" className="mail-checkbox" />
                </label>
                {/* <button className="make-note-btn icon-btn big note-sticky"></button> */}
                {/* <button className="mark-unread-btn icon-btn big envelope" ></button> */}
                {/* <button className="delete-btn icon-btn big trash-can-regular" ></button> */}

            </div>




            <div className="date-range-picker flex align-center">

                <label>From</label>
                <div className="input-wraper">
                    {startDate && <button className="clear-btn icon-btn medium xmark" onClick={onClearStartDate}></button>}
                    <input type="date"
                        value={startDate}
                        max={endDate || undefined}
                        onChange={handleStartChange}
                    />
                </div>

                <label>To </label>
                <div className="input-wraper">
                    {endDate && <button className="clear-btn icon-btn medium xmark" onClick={onClearEndDate}></button>}
                    <input type="date"
                        value={endDate}
                        min={startDate || undefined}
                        onChange={handleEndChange}
                    />
                </div>
            </div>

        </section>
    )
}