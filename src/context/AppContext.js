import React, { createContext, useState } from 'react'

export const AppContext = createContext()

export default function AppContextProvider({ children }) {
    const [currentId, setCurrentId] = useState(0)

    const [page, setPage] = useState(1)

    const [pageSearch, setPageSearch] = useState(1)

    const [showSearchModalOnMoB, setShowSearchModalOnMoB] = useState(false)

    const [showCUPostModalOnMoB, setShowCUPostModalOnMoB] = useState(false)

    const [showToast, setShowToast] = useState(false)

    const [darkTheme, setDarkTheme] = useState(false)

    const data = {
        currentId, setCurrentId,
        page, setPage,
        showSearchModalOnMoB, setShowSearchModalOnMoB,
        showCUPostModalOnMoB, setShowCUPostModalOnMoB,
        showToast, setShowToast,
        pageSearch, setPageSearch,
        darkTheme, setDarkTheme
    }
    return (
        <AppContext.Provider value={data}>
            {children}
        </AppContext.Provider>
    )
}
