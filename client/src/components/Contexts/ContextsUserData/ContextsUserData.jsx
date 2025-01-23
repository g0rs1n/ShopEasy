import { useState, createContext } from "react"

export const UserDataContext = createContext({})
export const SetUserDataContext = createContext(null)

export default function UserDataProvider ({children}) {

    const [userData, setUserData] = useState({})

    return (
        <>
            <UserDataContext.Provider value={userData}>
                <SetUserDataContext.Provider value={setUserData}>
                    {children}
                </SetUserDataContext.Provider>
            </UserDataContext.Provider>
        </>
    )
}