// === React


// const { useState, useEffect, useRef } = React
const { useRef } = React
// const { Routes, Route, Navigate, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM
const { NavLink } = ReactRouterDOM

// === Services

// === Child Components




// ====== Component ======
// =======================

export function MailSideNav({ onOpenCompose, isSideNavPinned, unreadByStatus }) {
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
        intervalId.current = setTimeout(() => {
            closeSideBar()
        }, 300);
    }


// const inboxCount = unreadByStatus && unreadByStatus.inbox > 0 ? unreadByStatus.inbox : ""
// const trashCount = unreadByStatus && unreadByStatus.inbox > 0 ? unreadByStatus.inbox : ""
// const unreadCount = unreadByStatus && unreadByStatus.inbox > 0 ? unreadByStatus.inbox : ""
// const starredCount = unreadByStatus && unreadByStatus.starred > 0 ? unreadByStatus.starred : ""
// const sentCount = unreadByStatus && unreadByStatus.sent > 0 ? unreadByStatus.sent : ""
// const draftCount = unreadByStatus && unreadByStatus.draft > 0 ? unreadByStatus.draft : ""

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
                        <NavLink to={{ pathname: '/mail/inbox', search: '?status=inbox' }}
                            className="inbox-btn flex"
                            onMouseOver={onOpenSideNav}
                            onMouseOut={onCloseSideNav} >
                            <p className="title">Inbox</p>
                            <p className="attribute">{unreadByStatus && unreadByStatus.inbox}</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={{ pathname: '/mail/unread', search: '?status=unread' }}
                            className="unread-btn flex"
                            onMouseOver={onOpenSideNav}
                            onMouseOut={onCloseSideNav} >
                            <p className="title">Unread</p>
                            <p className="attribute">{unreadByStatus && unreadByStatus.unread}</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={{ pathname: '/mail/starred', search: '?status=starred' }}
                            className="starred-btn flex"
                            onMouseOver={onOpenSideNav}
                            onMouseOut={onCloseSideNav} >
                            <p className="title">Starred</p>
                            <p className="attribute">{unreadByStatus && unreadByStatus.starred}</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={{ pathname: '/mail/draft', search: '?status=draft' }}

                            className="draft-btn flex"
                            onMouseOver={onOpenSideNav}
                            onMouseOut={onCloseSideNav} >
                            <p className="title">Drafts</p>
                            <p className="attribute">{unreadByStatus && unreadByStatus.draft}</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={{ pathname: '/mail/sent', search: '?status=sent' }}
                            className="sent-btn flex"
                            onMouseOver={onOpenSideNav}
                            onMouseOut={onCloseSideNav} >
                            <p className="title">Sent</p>
                            <p className="attribute">{unreadByStatus && unreadByStatus.sent}</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={{ pathname: '/mail/trash', search: '?status=trash' }}
                            className="trash-btn flex"
                            onMouseOver={onOpenSideNav}
                            onMouseOut={onCloseSideNav} >
                            <p className="title">Trash</p>
                            <p className="attribute">{unreadByStatus && unreadByStatus.trash}</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </section>
    )
}