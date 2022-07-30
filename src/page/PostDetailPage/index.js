import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import Loading from '../../components/Loading'
import { getPost } from '../../redux/actions/posts'
import CommentsSection from '../../components/CommentsSection'
import { AppContext } from '../../context/AppContext'
import Navbar from '../../components/NavBar/NavBar'
import OptionsInMobile from '../../components/OptionsInMob'

export default function PostDetailPage() {

    const dispatch = useDispatch()

    const { id } = useParams()

    const { darkTheme } = useContext(AppContext)

    const { post } = useSelector(state => state.posts)

    const isLoading = useSelector(state => state.loading)

    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

    return (
        <>
            <Navbar />
            <OptionsInMobile />
            {isLoading ? <div className="pt-24 px-3 sm:px-0 sm:pt-0"><Loading /></div> :
                <div className="pt-24 sm:pt-0">
                    <div className="px-3 sm:px-0">
                        <div className={`${darkTheme ? 'bg-slate-700 text-white' : 'bg-slate-100'} p-5 shadow-xl rounded-xl overflow-hidden flex sm:flex-row sm:mt-0 flex-col`}>
                            <div className="sm:w-3/5 w-full sm:px-3">
                                <h2 className="text-2xl font-bold">{post?.title}</h2>
                                <p className="text-slate-400">{post?.tags.map(tag => ` #${tag.trim()}`)}</p>
                                <p className="my-2 text-lg">{post?.message}</p>
                                <p className="font-bold">Created by: {post?.name}</p>
                                <p className="text-slate-400">{moment(post?.createdAt).fromNow()}</p>
                                <div className="py-2 mt-3 border-t border-solid border-slate-400">
                                    <CommentsSection post={post} />
                                </div>
                            </div>
                            <div className="sm:w-2/5 w-full sm:px-3">
                                <div className="rounded-md overflow-hidden">
                                    <img
                                        className="w-full h-[280px] object-cover"
                                        src={post?.selectedFile} alt={post?.title} title={post?.title}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}
