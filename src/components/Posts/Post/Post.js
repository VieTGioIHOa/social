import React, { useContext, useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { useLocation, useNavigate } from 'react-router-dom'

import { AppContext } from '../../../context/AppContext'
import { deletePost, likePost, getPosts, getPostsBySearch } from '../../../redux/actions/posts'
import Spinner from '../../Loading/spinner'

function Post({ post }) {
    const {
        currentId,
        setCurrentId,
        setShowCUPostModalOnMoB,
        page,
        darkTheme
    } = useContext(AppContext)

    const { authData } = useSelector(state => state.auth)
    const { isSpinner } = useSelector(state => state.loading)

    const [likes, setLikes] = useState(post?.likes)

    const user = JSON.parse(localStorage.getItem('profile'))

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const query = new URLSearchParams(location.search)
    const token = query.get('search')

    const handleUpdatePost = (e) => {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        setShowCUPostModalOnMoB(true)
        setCurrentId(post._id)
    }

    const handleDeletePost = () => {
        dispatch(deletePost(post._id))

        if (token) {
            dispatch(getPostsBySearch(token, page))
        } else {
            dispatch(getPosts(page))
        }
    }

    const handleOpenPostDetail = () => {
        navigate(`/posts/${post._id}`)
    }

    const userId = authData?.result?._id
    const hasLikedPost = post?.likes.find(id => id === userId)

    const handleLikePost = () => {
        if (user?.result?.name) {
            dispatch(likePost(post._id))
            if (hasLikedPost) {
                setLikes(post.likes.filter(id => id !== userId))
            } else {
                setLikes([...post.likes, userId])
            }
        } else {
            toast.warning('You need to login to like this post', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find(like => like === userId) ?
                (
                    <div className="flex items-center">
                        <HeartIconSolid className="h-[18px] w-[18px] mr-[2px]" /> {likes.length} You {likes.length > 1 ? `and ${likes.length - 1} other` : `${likes.length > 1 ? likes.length - 1 : ''}`}
                    </div>
                ) : (
                    <div className="flex items-center">
                        <HeartIcon className="h-[18px] w-[18px] mr-[2px]" />{likes.length} {likes.length > 2 ? 'Likes' : 'Like'}
                    </div>
                )
        }
        return (
            <div className={`flex items-center`}>
                <HeartIcon className="h-[18px] w-[18px] mr-[2px] " /> Like
            </div>
        )
    }

    return (
        <div className="relative rounded-xl bg-white shadow-md overflow-hidden">
            {isSpinner && currentId === post?._id && <div className="absolute flex items-center justify-center z-50 top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.2)]">
                <Spinner />
            </div>}
            <div
                className="cursor-pointer"
                onClick={handleOpenPostDetail}
            >
                <div className="relative">
                    <img
                        className="w-full h-[175px] object-cover"
                        src={post.selectedFile} alt={post.title} title={post.title}
                    />
                    <div className="absolute top-5 left-5 text-white text-left">
                        <h3 className="text-xl">{post.name}</h3>
                        <p>{moment(post.createdAt).fromNow()}</p>
                    </div>
                    {authData?.result._id === post.creator && (
                        <Tippy
                            content={<span>Editing</span>}
                        >
                            <div
                                onClick={handleUpdatePost}
                                className="absolute z-10 px-1 top-6 right-8 text-white text-xl cursor-pointer rounded-full active:bg-[rgba(0,0,0,0.2)]"
                            >
                                <FontAwesomeIcon className="h-6 w-6" icon={faPenToSquare} />
                            </div>
                        </Tippy>
                    )}
                </div>
            </div>
            <div className={`${darkTheme ? 'bg-slate-700 text-white' : 'bg-slate-100'} p-5`}>
                <p className="text-slate-400">{post?.tags.map(tag => ` #${tag.trim()}`)}</p>
                <p className="text-xl font-bold my-2 line-clamp-2">{post?.title}</p>
                <p className="h-[74px] line-clamp-3">{post?.message}</p>
                <div className="flex justify-between mt-2">
                    <div
                        onClick={handleLikePost}
                        className={`${darkTheme ? 'text-white' : 'text-slate-400'} ${!authData ? 'text-white' : 'text-blue-700'}  cursor-pointer active:bg-[rgba(0,0,0,0.1)] p-1 rounded-md`}
                    >
                        <Likes />
                    </div>
                    {authData?.result._id === post.creator && (
                        <div
                            onClick={handleDeletePost}
                            className="text-red-500 cursor-pointer active:bg-[rgba(0,0,0,0.1)] p-1 rounded-md"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                            Delete
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default React.memo(Post)