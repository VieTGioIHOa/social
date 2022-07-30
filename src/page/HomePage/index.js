import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../../Layout'
import Posts from '../../components/Posts/Posts'
import { getPosts } from '../../redux/actions/posts'
import Loading from '../../components/Loading'
import { AppContext } from '../../context/AppContext'

export default function HomePage() {
    const dispatch = useDispatch()

    const { posts, pageCount } = useSelector(state => state.posts)

    const isLoading = useSelector(state => state.loading)

    const { page } = useContext(AppContext)

    useEffect(() => {
        dispatch(getPosts(page))
    }, [dispatch, page])

    return (
        <Layout>
            {isLoading ? <Loading /> : <Posts posts={posts} pageCount={pageCount} />}
        </Layout>
    )
}
