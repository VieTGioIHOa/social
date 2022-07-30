import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import decode from 'jwt-decode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import Search from '../Search'
import logo from '../../assets/img/logo.png'
import ToggleTheme from '../Switch'
import { AppContext } from '../../context/AppContext'

import { LOGOUT } from '../../redux/contants/actionType'
export default function NavBar() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [showOpt, setShowOpt] = useState(false)

    const { darkTheme } = useContext(AppContext)

    const { authData } = useSelector(state => state.auth)
    const handleLogout = () => {
        dispatch({ type: LOGOUT })
        setShowOpt(false)
        navigate('/')
    }

    useEffect(() => {
        const token = authData?.token

        if (token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout()
        }
    }, [authData?.token])


    return (
        <div className={`${darkTheme ? 'bg-slate-700' : 'bg-slate-100'} fixed z-50 shadow-lg top-0 left-0 right-0 sm:static  rounded-xl p-5 sm:mb-10 h-20 flex justify-between items-center`}>
            <Link
                to="/posts"
                className=""
            >
                <div className="h-full"><img className="object-cover" src={logo} alt="logo" /></div>
            </Link>
            <div className="hidden sm:block">
                <ToggleTheme />
            </div>
            <div className={`hidden sm:block sm:flex-1 sm:mx-10`}><Search /></div>
            {authData?.result ? (
                <div className="flex items-center">
                    <div className="h-10 w-10 mr-2 rounded-full ring-2 ring-white bg-blue-900 text-white flex items-center justify-center">{authData?.result.name.charAt(0).toUpperCase()}</div>
                    <h3 className={`${darkTheme ? 'text-white' : 'text-black'} text-xl mr-4`}>{authData?.result?.name}</h3>
                    <Tippy
                        visible={showOpt}
                        interactive={true}
                        placement="bottom"
                        render={attrs => (
                            <div className={`${darkTheme ? 'bg-slate-600' : 'bg-slate-100'} px-5 py-3 rounded-md shadow-xl`} tabIndex="-1" {...attrs}>
                                <div className="">
                                    <ToggleTheme />
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-blue-400 hover:bg-blue-600 px-3 py-2 text-sm rounded-md text-white w-full flex items-center justify-center mt-3"
                                >
                                    LOG OUT
                                </button>
                            </div>
                        )}
                        onClickOutside={() => setShowOpt(false)}
                    >
                        <div
                            onClick={() => setShowOpt(prevOpt => !prevOpt)}
                            className="sm:hidden h-6 w-6 cursor-pointer ">
                            <FontAwesomeIcon className={`${darkTheme ? 'text-slate-100' : 'text-slate-900'} h-6 w-6 text-black`} icon={faEllipsisVertical} />
                        </div>
                    </Tippy>
                    <button
                        onClick={handleLogout}
                        className="bg-blue-400 hover:bg-blue-600 px-3 py-2 text-sm rounded-md text-white hidden sm:flex items-center"
                    >
                        LOG OUT
                    </button>
                </div>
            ) : (
                <>
                    <div className="sm:hidden">
                        <ToggleTheme />
                    </div>
                    <Link
                        className="bg-blue-400 hover:bg-blue-600 px-3 py-2 text-sm rounded-md text-white flex items-center"
                        to="/auth"
                    >
                        SIGN IN
                    </Link>
                </>
            )}

        </div>
    )
}
