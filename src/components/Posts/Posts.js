import React from 'react'

import Post from './Post/Post'
import Pagination from '../Pagination'

export default function Posts({ posts, pageCount }) {
    return (
        <>
            <div className="lg:flex-row flex-col flex flex-wrap sm:mx-[-8px]">
                {posts.map(post => (
                    <div key={post._id} className="w-full sm:w-full lg:w-1/2 sm:px-2 mb-3">
                        <Post post={post} />
                    </div>
                ))}
            </div>
        </>
    )
}
