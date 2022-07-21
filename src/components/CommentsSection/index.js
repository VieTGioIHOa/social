import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { commentPost } from '../../redux/actions/posts'


export default function CommentsSection({ post }) {
    const dispatch = useDispatch()

    const { authData } = useSelector(state => state.auth)

    const [comment, setComment] = useState('')

    const [comments, setComments] = useState(post?.comments)

    const commentRef = useRef()

    const handleSendComment = async () => {
        const finalComment = `${authData?.result?.name}: ${comment}`
        const newComments = await dispatch(commentPost(finalComment, post._id))
        setComments(newComments)
        commentRef.current.scrollIntoView({ behavior: 'smooth' })
        setComment('')
    }

    return (
        <div className="flex mx-[-12px]">
            <div className="w-2/5 px-3">
                <h2 className="text-xl text-slate-400">Comments</h2>
                <div className="max-h-[130px] overflow-auto mt-2">
                    {comments && comments.map((comment, i) => (
                        <p key={i}><strong>{comment.split(':')[0]}</strong> :{comment.split(':')[1]}</p>
                    ))}
                    <div ref={commentRef}></div>
                </div>
            </div>
            {authData?.result?.name &&
                <div className="w-3/5 px-3">
                    <h2 className="text-xl text-slate-400">Write a Comment</h2>
                    <div>
                        <textarea
                            rows="3"
                            placeholder="Write a Comment here..."
                            type="text"
                            className="form-input text-black px-3 py-1 my-1 rounded-md w-full border border-solid border-slate-400 "
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <button
                            onClick={handleSendComment}
                            className="px-3 py-1 bg-blue-400 w-full hover:bg-blue-700 rounded-md text-white uppercase">
                            Send
                        </button>
                    </div>
                </div>}
        </div>
    )
}
