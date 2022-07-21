import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { signup, signin } from '../../redux/actions/auth'
import { AppContext } from '../../context/AppContext'
import logo from '../../assets/img/logo.png'
import ToggleTheme from '../Switch'

export default function Auth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { authData } = useSelector(state => state.auth)
    useEffect(() => {
        if (authData?.result) navigate('/posts')
    }, [])

    const { darkTheme } = useContext(AppContext)

    const [isSignUp, setIsSignUp] = useState(false)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignUp) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSwitchMode = () => {
        setIsSignUp(prev => !prev)
    }

    return (
        <>
            <div className={`${darkTheme ? 'bg-slate-700' : 'bg-slate-200'} fixed z-50 shadow-lg top-0 left-0 right-0 sm:static  rounded-xl p-5 mb-10 h-20 flex justify-between items-center`}>
                <Link
                    to="/posts"
                    className=""
                >
                    <div className="h-full"><img className="object-cover" src={logo} alt="logo" /></div>
                </Link>
                <div className="">
                    <ToggleTheme />
                </div>
            </div>
            <div className="flex justify-center">
                <div className={`${darkTheme ? 'bg-slate-700 text-white' : 'bg-slate-200 text-black'} max-w-[400px] mt-28 sm:mt-0 mx-5 p-5 rounded-md text-center`}>
                    <h3 className="uppercase text-xl mb-5">{isSignUp ? 'sign up' : 'sign in'}</h3>
                    <form className="" onSubmit={handleSubmit}>
                        {isSignUp && <div className="flex justify-between">
                            <input
                                autoFocus={true}
                                className="form-input text-black w-[47%] px-3 py-2 border border-solid border-slate-300 rounded"
                                name="firstName"
                                placeholder="First Name*"
                                type="text"
                                onChange={handleChange}
                            />
                            <input
                                className="form-input text-black w-[47%] px-3 py-2 border border-solid border-slate-300 rounded"
                                name="lastName"
                                placeholder="Last Name*"
                                type="text"
                                onChange={handleChange}
                            />
                        </div>}
                        <div className="mt-3">
                            <input
                                autoFocus={isSignUp === false && true}
                                type="email"
                                name="email"
                                placeholder='Email*'
                                className="form-input text-black w-full px-3 py-2 border border-solid border-slate-300 rounded"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-3">
                            <input
                                type="password"
                                name="password"
                                placeholder='Password*'
                                className="form-input text-black w-full px-3 py-2 border border-solid border-slate-300 rounded"
                                onChange={handleChange}
                            />
                        </div>
                        {isSignUp && <div className="mt-3">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder='Reset Password*'
                                className="form-input text-black w-full px-3 py-2 border border-solid border-slate-300 rounded"
                                onChange={handleChange}
                            />
                        </div>}
                        <button type="submit" className="w-full px-3 py-2 bg-blue-400 hover:bg-blue-500 rounded-md text-white uppercase text-lg mt-3">{isSignUp ? 'sign up' : 'sign in'}</button>
                        {isSignUp ?
                            <p className="uppercase text-sm mt-3">already have an account?<span className="hover:underline cursor-pointer ml-1" onClick={handleSwitchMode}>sign in</span></p> :
                            <p className="uppercase text-sm mt-3">you don't have an account?<span className="hover:underline cursor-pointer ml-1" onClick={handleSwitchMode}>sign up</span></p>}
                    </form>
                </div>
            </div>
        </>
    )
}
