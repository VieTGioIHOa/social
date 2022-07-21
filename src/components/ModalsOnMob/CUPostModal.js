import React, { useContext } from 'react'

import Form from '../Form/Form'
import { AppContext } from '../../context/AppContext'

export default function CUPostModal() {
    const { showCUPostModalOnMoB, setShowCUPostModalOnMoB } = useContext(AppContext)

    return (
        <div
            onClick={() => setShowCUPostModalOnMoB(false)}
            className={`${showCUPostModalOnMoB ? 'flex' : 'hidden'} sm:hidden fixed top-0 left-0 bg-[rgba(0,0,0,0.2)] w-screen h-screen z-50 items-center justify-center`}
        >
            <div
                onClick={(e) => {
                    e.nativeEvent.stopImmediatePropagation()
                    e.stopPropagation()
                }}
                className="px-10"
            >
                <Form />
            </div>
        </div>
    )
}
