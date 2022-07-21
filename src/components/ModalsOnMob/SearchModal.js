import React, { useContext } from 'react'

import Search from '../Search'
import { AppContext } from '../../context/AppContext'

export default function SearchModal() {

    const { showSearchModalOnMoB, setShowSearchModalOnMoB } = useContext(AppContext)

    return (
        <div
            onClick={() => {
                setShowSearchModalOnMoB(false)
            }}
            className={`${showSearchModalOnMoB ? 'flex' : 'hidden'} fixed top-0 left-0 bg-[rgba(0,0,0,0.2)] w-screen h-screen z-50  justify-center`}
        >
            <div
                onClick={(e) => {
                    e.nativeEvent.stopImmediatePropagation()
                    e.stopPropagation()
                }}
                className="max-h-[200px] absolute top-40 px-10"
            >
                <Search />
            </div>
        </div>
    )
}
