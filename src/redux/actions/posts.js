import * as api from '../../api'
import {
    CREATE_POST,
    FETCH_POSTS_BY_SEARCH,
    DELETE_POST,
    UPDATE_POST,
    FETCH_ALL,
    LIKE_POST,
    FETCH_POST,
    COMMENT
} from '../contants/actionType'
import { showSkeleton, hideSkeleton, showSpinner, hideSpinner } from './loading'
import { toast } from 'react-toastify'

//actions creator

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id)
        dispatch({ type: COMMENT, payload: data })
        return data.comments
    } catch (error) {
        console.log(error)
    }
}


export const getPost = (id) => async (dispatch) => {
    dispatch(showSkeleton())
    try {
        const { data } = await api.fetchPost(id)
        dispatch({ type: FETCH_POST, payload: data })
        dispatch(hideSkeleton())
    } catch (error) {
        dispatch(hideSkeleton())
        console.log(error.message)
    }
}


export const getPosts = (page) => async (dispatch) => {
    dispatch(showSkeleton())
    try {
        const { data } = await api.fetchPosts(page)
        dispatch({ type: FETCH_ALL, payload: data })
        dispatch(hideSkeleton())
    } catch (error) {
        dispatch(hideSkeleton())
        console.log(error.message)
    }
}

export const getPostsBySearch = (searchQuery, page) => async (dispatch) => {
    dispatch(showSkeleton())
    try {
        const { data } = await api.fetchPostsBySearch(searchQuery, page)
        dispatch({ type: FETCH_POSTS_BY_SEARCH, payload: data })
        dispatch(hideSkeleton())
    } catch (error) {
        dispatch(hideSkeleton())
        console.log(error)
    }
}
export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)
        dispatch({ type: CREATE_POST, payload: data })
        toast.success('Created post successfully!!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id, updatedPost) => async (dispatch) => {
    dispatch(showSpinner())
    try {
        const { data } = await api.updatePost(id, updatedPost)
        dispatch(hideSpinner())
        dispatch({ type: UPDATE_POST, payload: data })
        toast.success('Updated post successfully!!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    } catch (error) {
        dispatch(showSpinner())
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.deletePost(id)
        dispatch({ type: DELETE_POST, payload: data })
        toast.success('Deleted post successfully!!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: LIKE_POST, payload: data })
    } catch (error) {
        console.log(error)
    }
}