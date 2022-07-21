import React, { useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Layout from '../../Layout'
import Posts from '../../components/Posts/Posts'
import Loading from '../../components/Loading'
import { getPostsBySearch } from '../../redux/actions/posts'
import { AppContext } from '../../context/AppContext'

export default function SearchPage() {

    const dispatch = useDispatch()
    const location = useLocation()

    const query = new URLSearchParams(location.search)
    const token = query.get('search')

    const { pageSearch } = useContext(AppContext)

    const { postsBySearch, pageCount } = useSelector(state => state.posts)

    useEffect(() => {
        dispatch(getPostsBySearch(token, pageSearch))
    }, [dispatch])

    const isLoading = useSelector(state => state.loading)

    return (
        <Layout>
            {isLoading ? <Loading /> : <Posts posts={postsBySearch} pageCount={pageCount} />}
        </Layout>
    )
}
