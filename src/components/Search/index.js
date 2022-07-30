import React, { useState, useContext, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { debounce } from "lodash"
import TippyHeadless from '@tippyjs/react/headless';

import { AppContext } from '../../context/AppContext'
import { getPostsBySearch } from '../../redux/actions/posts'
import * as api from '../../api'

export default function Search() {

    const { setShowSearchModalOnMoB, pageSearch, darkTheme } = useContext(AppContext)

    const [search, setSearch] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const [dataOnSearch, setDataOnSearch] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchDataSearch = async (value) => {
        setIsLoading(true)
        const { data: { posts } } = await api.fetchPostsBySearch(value)
        setDataOnSearch(posts)
        setIsLoading(false)
    }

    const debouncedSearch = useCallback(debounce(value => fetchDataSearch(value), 700), [])

    const onSearchPosts = async (e) => {
        setSearch(e.target.value)
        debouncedSearch(e.target.value)
    }

    const handleSearchPosts = () => {
        if (search.trim()) {
            //dispatch search action creator
            dispatch(getPostsBySearch(search, pageSearch))
            navigate(`/posts/search?search=${search.trim()}`)
            setSearch('')
        } else {
            navigate('/')
        }
        setShowSearchModalOnMoB(false)
    }

    return (
        <div className={`${darkTheme ? 'bg-slate-700 text-white' : 'bg-slate-100 '} relative block sm:p-0 p-5 rounded-md sm:mb-0 mb-7`}>
            <div
                className="absolute cursor-pointer top-5 right-5 sm:hidden text-xl h-8 w-8 flex items-center justify-center rounded-full active:bg-[rgba(0,0,0,0.2)]"
                onClick={() => setShowSearchModalOnMoB(false)}
            >
                <FontAwesomeIcon icon={faXmark} />
            </div>
            <h2 className="text-2xl sm:hidden uppercase text-center mb-5">search</h2>
            <form className="sm:flex items-center justify-center">
                <TippyHeadless
                    interactive={true}
                    placement="bottom"
                    visible={dataOnSearch.length > 0}
                    zIndex={9999}
                    onClickOutside={() => setDataOnSearch([])}
                    render={attrs => (
                        <div className={`${darkTheme ? 'bg-slate-600 text-white' : 'bg-slate-100'}  shadow-xl rounded-md p-5 w-[300px] sm:w-[400px]`} tabIndex="-1" {...attrs}>
                            {dataOnSearch.map((data) => (
                                <Link
                                    to={`/posts/${data._id}`}
                                    key={data._id}
                                    onClick={() => {
                                        setShowSearchModalOnMoB(false)
                                        setDataOnSearch([])
                                        setSearch('')
                                    }}
                                    className={`${darkTheme ? 'bg-slate-700' : 'bg-slate-200'} flex items-center hover:bg-[rgba(0,0,0,0.1)] p-3 rounded-md mb-2`}>
                                    <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center">
                                        {data?.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-bold">{data?.title}</h3>
                                            <span className="text-slate-400">by {data?.name}</span>
                                        </div>
                                        <p>{data?.message}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                >
                    <div className="max-w-[400px] flex-1 sm:mr-5 relative">
                        <input
                            className="form-input text-black w-full px-3 py-1 border border-solid border-slate-300 rounded-md"
                            name="search"
                            placeholder="Search Post"
                            value={search}
                            onChange={onSearchPosts}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setSearch('')
                                setDataOnSearch([])
                            }}
                            className={`${search.length > 0 ? 'block' : 'hidden'} ${isLoading && 'hidden'} absolute text-black active:bg-[rgba(0,0,0,0.2)] rounded-full h-6 w-6 right-4 top-[50%] translate-y-[-50%]`}>
                            <FontAwesomeIcon icon={faXmark}
                            />
                        </button>
                        <button
                            type="button"
                            className={`${isLoading ? 'block' : 'hidden'} absolute text-black active:bg-[rgba(0,0,0,0.2)] rounded-full h-6 w-6 right-4 top-[50%] translate-y-[-50%]`}>
                            <FontAwesomeIcon className="animate-spin" icon={faSpinner}
                            />
                        </button>
                    </div>
                </TippyHeadless>
                <button
                    onClick={handleSearchPosts}
                    type="button"
                    className="sm:mt-0 sm:w-10 w-full mt-3 rounded-md text-white px-3 py-2 bg-blue-400 hover:bg-blue-500"
                >
                    <FontAwesomeIcon className="hidden sm:block" icon={faMagnifyingGlass} />
                    <span className="block sm:hidden uppercase">search</span>
                </button>
            </form>
        </div>
    )
}
