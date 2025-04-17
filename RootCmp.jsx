// === React
const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

// === Services

// === Child Components
import { MainHeader } from "./cmps/app/MainHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { FlashMsg } from "./cmps/general/FlashMsg.jsx"
import { GlobalDialog } from "./cmps/general/Modal.jsx"
import { NotFound } from "./cmps/general/NotFound.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { MailView } from "./apps/mail/cmps/MailView.jsx"
import { MailList } from "./apps/mail/cmps/MailList.jsx"


// ====== Component ======
// =======================

export function RootCmp() {
    // === Hooks

    // === Effects

    // === Functions

    return (
        <Router>
            <section className="app grid main-layout">
                <MainHeader />

                <main className="main-content grid main-inline-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/mail" element={<MailIndex />} />
                        <Route path="/mail/:status/" element={<MailIndex />} />
                        <Route path="/mail/view/:mailId" element={<MailIndex />} />
                        <Route path="/note" element={<NoteIndex />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <FlashMsg />
                <GlobalDialog />
            </section>
        </Router>
    )
} 