import { useState, useContext } from 'react'
import { Switch } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faBrightness } from '@fortawesome/free-solid-svg-icons'
import { SunIcon } from '@heroicons/react/outline'

import { AppContext } from '../../context/AppContext'

export default function Example() {

    const { darkTheme, setDarkTheme } = useContext(AppContext)

    return (
        <div className="flex items-center">
            <div className="mr-2 flex items-center">
                {darkTheme ? <FontAwesomeIcon className="h-7 w-7 text-slate-200" icon={faMoon} /> : <SunIcon className="h-7 w-7 text-slate-800" />}
            </div>
            <Switch
                checked={darkTheme}
                onChange={() => setDarkTheme(prev => !prev)}
                className={`${darkTheme ? 'bg-blue-900' : 'bg-blue-200'}
                    shadow-md relative inline-flex h-8 w-[68px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${darkTheme ? 'translate-x-9' : 'translate-x-0'}
                        pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
    )
}
