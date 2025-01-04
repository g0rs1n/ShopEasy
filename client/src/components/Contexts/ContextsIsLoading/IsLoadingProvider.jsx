import { useState, createContext } from "react";

export const IsLoadingContext = createContext(true)
export const SetIsLoadingContext = createContext(null)

export default function IsLoadingProvider ({children}) {

    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
            <IsLoadingContext.Provider value={isLoading}>
                <SetIsLoadingContext.Provider value={setIsLoading}>
                    {children}
                </SetIsLoadingContext.Provider>
            </IsLoadingContext.Provider>
        </>
    )
}