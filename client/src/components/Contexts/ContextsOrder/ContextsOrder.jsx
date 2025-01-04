import { createContext } from "react";

export const CheckIsActivePageContext = createContext('/order/information')

export default function IsActivePage ({children, checkIsActivePage}) {

    return (
        <>
            <CheckIsActivePageContext.Provider value={checkIsActivePage}>
                {children}
            </CheckIsActivePageContext.Provider>
        </>
    )
}