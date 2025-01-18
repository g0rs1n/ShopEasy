import { Outlet } from "react-router-dom";
import HeaderUser from "./components/UserVer/Header/Header";
import './styles/UserVerApp.scss'

export default function UserVerApp () {

    return (
        <>
            <div className="wrapper-userver">
                <div className="userver-header">
                    <HeaderUser/>
                </div>
                <div className="userver-main">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}