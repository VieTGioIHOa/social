import React, { useState, useContext, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom'

import { createPost, updatePost, getPosts, getPostsBySearch } from '../../redux/actions/posts'
import { AppContext } from '../../context/AppContext'

export default function Form() {

    const {
        currentId,
        setCurrentId,
        setShowCUPostModalOnMoB,
        page,
        darkTheme,
    } = useContext(AppContext)

    const post = useSelector(state => currentId ? state.posts.posts.find(p => p._id === currentId) : null)
    const { authData } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const location = useLocation()

    const query = new URLSearchParams(location.search)
    const token = query.get('search')

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    })

    useEffect(() => {
        setPostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: authData?.result.name }))

            Clear()

        } else {
            dispatch(createPost({ ...postData, name: authData?.result.name }))

            if (token) {
                dispatch(getPostsBySearch(token, page))
            } else {
                dispatch(getPosts(page))
            }

            Clear()
        }

        setShowCUPostModalOnMoB(false)
    }

    const Clear = () => {
        setCurrentId(null)
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        })
    }

    if (!authData?.result) {
        return (
            <div className={`${darkTheme ? 'bg-slate-700 text-white' : 'bg-slate-100 text-black'} relative mb-3 max-h-[200px] rounded-md p-5 flex flex-col items-center justify-center`}>
                <div
                    className="absolute cursor-pointer top-5 right-5 sm:hidden text-xl h-8 w-8 flex items-center justify-center rounded-full active:bg-[rgba(0,0,0,0.2)]"
                    onClick={() => setShowCUPostModalOnMoB(false)}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <FontAwesomeIcon
                    className="text-5xl text-slate-500"
                    icon={faCircleExclamation}
                />
                <p
                    className="mt-3 text-2xl text-center"
                >
                    You need to login to create a new post
                </p>
            </div>
        )
    }

    return (
        <div className={`${darkTheme ? 'bg-slate-700 text-white' : 'bg-slate-100 text-black'} w-full mb-3 rounded-xl`}>
            <div className="p-5 relative rounded-xl shadow-md">
                <div
                    className="absolute cursor-pointer top-5 right-5 sm:hidden text-xl h-8 w-8 flex items-center justify-center rounded-full active:bg-[rgba(0,0,0,0.2)]"
                    onClick={() => setShowCUPostModalOnMoB(false)}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <h2 className="text-2xl uppercase text-center">{currentId ? 'Editing' : 'Creating'} a post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mt-2 text-left">
                        <label className="">Title</label>
                        <input
                            placeholder='Title'
                            className="form-input text-black block shadow-sm w-full py-1 px-3 mt-1 rounded border border-solid border-slate-300"
                            name='title'
                            value={postData?.title}
                            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mt-2 text-left">
                        <label className="">Message</label>
                        <textarea
                            placeholder='Message'
                            className="form-textarea text-black block shadow-sm w-full py-1 px-3 mt-1 rounded border border-solid border-slate-300"
                            name='message'
                            value={postData?.message}
                            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                            required
                        ></textarea>
                    </div>
                    <div className="mt-2 text-left">
                        <label className="">Tags</label>
                        <input
                            placeholder='Tags'
                            className="form-input block text-black shadow-sm w-full py-1 px-3 mt-1 rounded border border-solid border-slate-300"
                            name='tags'
                            value={postData?.tags}
                            onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                            required
                        />
                    </div>
                    <div className="mt-4 text-left">
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                        />
                        {/* <input type="file" name="selectedFile"
                            onChange={(e) => {
                                console.log(e.target.files[0])
                                setPostData({ ...postData, selectedFile: e.target.files[0] })
                            }}
                        /> */}
                    </div>
                    <div className="mt-4 text-left">
                        <button
                            type="submit"
                            className="bg-blue-400 uppercase w-full px-3 py-2 rounded-md hover:bg-blue-600 text-white text-xl"
                        >
                            Submit
                        </button>
                        <button
                            onClick={Clear}
                            type="button"
                            className="bg-yellow-400 uppercase px-2 py-1 rounded-md hover:bg-yellow-600 text-white w-full mt-3"
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
