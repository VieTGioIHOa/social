import { useContext } from 'react'

import { AppContext } from '../../context/AppContext'

export default function GlobalStyle({ children }) {

    const { darkTheme } = useContext(AppContext)
    return (
        <div className={`${darkTheme ? 'bg-slate-800' : 'bg-slate-100'} min-h-screen`}>
            {children}
        </div>
    )
}
