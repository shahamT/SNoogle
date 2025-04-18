// === React
// const { useState, useEffect, useRef } = React
const { useRef } = React
// const { Routes, Route, Navigate, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM
const { NavLink } = ReactRouterDOM

// === Services

// === Child Components




// ====== Component ======
// =======================

export function MailSideNav({ onOpenCompose, isSideNavPinned }) {
    // === Hooks
const intervalId = useRef()
    // === Effects

    // === Functions
    function onOpenSideNav() {
        if (isSideNavPinned) return
        clearTimeout(intervalId.current)
        intervalId.current = setTimeout(() => {
            openSideBar()
        }, 300);
    }
    function onCloseSideNav() {
        if (isSideNavPinned) return
        clearTimeout(intervalId.current)
        intervalId.current =setTimeout(() => {
            closeSideBar()
        }, 300);
    }


    // if (!data) return <div>Loading...</div>
    return (
        <section className="mail-side-nav side-nav flex flex-column">
            <button 
            className="compose-btn"
            onClick={onOpenCompose}
            onMouseOver={onOpenSideNav}
            onMouseOut={onCloseSideNav}
            ></button>
            <nav className="side-nav-list">
                <ul className="clean-list flex flex-column">
                    <li>
                        <NavLink to="/mail/inbox"
                            className="inbox-btn flex"
                            onMouseOver={onOpenSideNav}
                            onMouseOut={onCloseSideNav} >
                                <p className="title">Inbox</p>
                                <p className="attribute">321</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mail/starred"
                            className="starred-btn flex"
                            onMouseOver={onOpenSideNav}
                            onMouseOut={onCloseSideNav} >
                                <p className="title">Starred</p>
                                <p className="attribute">321</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mail/draft"
                            className="draft-btn flex"
                            onMouseOver={onOpenSideNav}
                            onMouseOut={onCloseSideNav} >
                                <p className="title">Drafts</p>
                                <p className="attribute">321</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mail/trash"
                            className="trash-btn flex"
                            onMouseOver={onOpenSideNav}
                            onMouseOut={onCloseSideNav} >
                                <p className="title">Trash</p>
                                <p className="attribute">321</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </section>
    )
}