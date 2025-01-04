import Main from "./components/Main/Main";
import UserDataProvider from "./components/Contexts/ContextsUserData/ContextsUserData";
import HeaderUser from "./components/UserVer/Header/Header";
import './styles/UserVerApp.scss'

export default function UserVerApp () {

    return (
        <>
            <UserDataProvider>
                <div className="wrapper-userver">
                    <div className="userver-header">
                        <HeaderUser/>
                    </div>
                    <div className="userver-main">
                        <Main/>
                    </div>
                </div>
            </UserDataProvider>
        </>
    )
}