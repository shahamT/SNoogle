import { MainLogo } from "../general/MainLogo.jsx"

// react
const { NavLink } = ReactRouterDOM

export function MainHeader({ onSetPage }) {

    return (
        <header className="main-header grid main-inline-layout ">
            <div className="main-header-content-wraper flex space-between align-center">
                <MainLogo/>
                <nav className="main-nav">
                    <ul className="flex space-between clean-list">
                        <li> <NavLink to="/home">Home</NavLink> </li>
                        <li> <NavLink to="/mail/inbox">Mail</NavLink> </li>
                        <li> <NavLink to="/note">Notes</NavLink> </li>
                        <li> <NavLink to="/about">About</NavLink> </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}