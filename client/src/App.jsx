import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Header from "./components/ClientVer/Headers/Header"
import ClientVerApp from "./ClientVerApp"

export default function App () {
    return (
        <>
            <div className="wrapper">
                <Header/>
                <Routes>
                    <Route path="/" element={<ClientVerApp/>}/>
                </Routes>
            </div>
        </>
    )
}