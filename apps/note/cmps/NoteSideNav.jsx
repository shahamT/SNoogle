// === React
// const { useState, useEffect, useRef } = React
const { useRef } = React
// const { Routes, Route, Navigate, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM
const { NavLink } = ReactRouterDOM

// === Services

// === Child Components




// ====== Component ======
// =======================

export function NoteSideNav({ onOpenCompose, isSideNavPinned }) {
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
        <section className="note-side-nav side-nav flex flex-column">

            <nav className="side-nav-list">
                <ul className="clean-list flex flex-column">
                    <li>
                    <NavLink to={{ pathname: '/notes/main', search: location.search }}
                            className="inbox-btn flex"
                            onMouseOver={onOpenSideNav}
                            onMouseOut={onCloseSideNav} >
                                <p className="title">Notes</p>
                                <p className="attribute"></p>
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to={{ pathname: '/notes/todos', search: location.search }}
                            className="starred-btn flex"
                            onMouseOver={onOpenSideNav}
                            onMouseOut={onCloseSideNav} >
                                <p className="title">To-dos</p>
                                <p className="attribute"></p>
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to={{ pathname: '/notes/images', search: location.search }}
                            className="draft-btn flex"
                            onMouseOver={onOpenSideNav}
                            onMouseOut={onCloseSideNav} >
                                <p className="title">Images</p>
                                <p className="attribute"></p>
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to={{ pathname: '/notes/archive', search: location.search }}
                            className="trash-btn flex"
                            onMouseOver={onOpenSideNav}
                            onMouseOut={onCloseSideNav} >
                                <p className="title">Archive</p>
                                <p className="attribute"></p>
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to={{ pathname: '/notes/trash', search: location.search }}
                            className="trash-btn flex"
                            onMouseOver={onOpenSideNav}
                            onMouseOut={onCloseSideNav} >
                                <p className="title">Trash</p>
                                <p className="attribute"></p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </section>
    )
}