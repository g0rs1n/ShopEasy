import { useState, createContext } from "react"

export const UserDataContext = createContext({})
export const SetUserDataContext = createContext(null)

export default function UserDataProvider ({children}) {

    const [userData, setUserData] = useState({
        name: 'Name is not available',
        email: 'Email is not available',
        phone: 'Phone is not available',
    })

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