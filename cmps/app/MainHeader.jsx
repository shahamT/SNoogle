import { MainLogo } from "../general/MainLogo.jsx"
import {MainSearchBar } from "./MainSearchBar.jsx"

// react
const { useState, useEffect } = React
const { NavLink, useLocation } = ReactRouterDOM


export function MainHeader({ onSetPage }) {
    const { pathname } = useLocation()
    const [isSearchVisible, setIsSearchVisible] = useState(false)

    useEffect(() => {
        toggleSearchBar()
    }, [pathname])

    function toggleSearchBar() {
        if (pathname.startsWith('/mail') || pathname.startsWith('/notes')) {
            setIsSearchVisible(true)
        } else {
            setIsSearchVisible(false)
        }
    }



    return (
        <header className="main-header grid main-inline-layout ">
            <div className="main-header-content-wraper flex space-between align-center">
                <MainLogo />

                {isSearchVisible && <MainSearchBar />}

                <nav className="main-nav">
                    <ul className="flex space-between clean-list">
                        <li> <NavLink to="/home">Home</NavLink> </li>
                        <li> <NavLink to="/mail/inbox">Mail</NavLink> </li>
                        <li> <NavLink to="/notes">Notes</NavLink> </li>
                        <li> <NavLink to="/about">About</NavLink> </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}