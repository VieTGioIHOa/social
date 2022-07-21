import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPen, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import { AppContext } from '../../context/AppContext'

export default function OptionsInMobile() {

    const [showOptions, setShowOptions] = useState(false)

    const { setShowSearchModalOnMoB, setShowCUPostModalOnMoB } = useContext(AppContext)

    return (
        <div className="flex items-center h-12 pl-3 z-10 sm:hidden fixed left-0 top-1/2 bg-[rgba(255,255,255,0.84)] text-white shadow-lg rounded-tr-full rounded-br-full">
            <div
                onClick={() => {
                    setShowOptions(false)
                    setShowCUPostModalOnMoB(true)
                }
                }
                className={`${showOptions ? 'flex' : 'hidden'} h-full w-12 justify-center rounded-full active:bg-[rgba(0,0,0,0.05)] cursor-pointer items-center`}><FontAwesomeIcon className="h-5 w-5 text-slate-500" icon={faPen} />
            </div>
            <div
                onClick={() => {
                    setShowOptions(false)
                    setShowSearchModalOnMoB(true)
                }}
                className={`${showOptions ? 'flex' : 'hidden'} h-full w-12 justify-center rounded-full active:bg-[rgba(0,0,0,0.05)] cursor-pointer items-center`}><FontAwesomeIcon className="h-5 w-5 text-slate-500" icon={faMagnifyingGlass} />
            </div>
            <div
                onClick={() => setShowOptions(prevOp => !prevOp)}
                className="h-full w-12 flex justify-center rounded-full bg-[rgba(36,38,83,0.2)] cursor-pointer items-center"><FontAwesomeIcon className="h-5 w-5" icon={showOptions ? faAngleLeft : faAngleRight} />
            </div>
        </div>
    )
}
