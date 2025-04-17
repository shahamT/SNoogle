// react
const { NavLink } = ReactRouterDOM

export function MainHeader({ onSetPage }) {

    return (
        <header className="main-header grid main-inline-layout ">
            <div className="main-header-content-wraper flex space-between align-center">
                <img src="img\logo\main-logo.png" alt="" className="main-logo" />
                <nav className="main-nav">
                    <ul className="flex space-between clean-list">
                        <li> <NavLink to="/home">Home</NavLink> </li>
                        <li> <NavLink to="/about">About</NavLink> </li>
                        <li> <NavLink to="/note">notes</NavLink> </li>
                        <li> <NavLink to="/mail">mail</NavLink> </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}