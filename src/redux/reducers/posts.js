import {
    CREATE_POST,
    FETCH_POSTS_BY_SEARCH,
    UPDATE_POST,
    DELETE_POST,
    FETCH_ALL,
    FETCH_POST,
    LIKE_POST,
    COMMENT
} from '../contants/actionType'

const initState = {
    post: null,
    posts: [],
    postsBySearch: [],
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_POST:
            return {
                ...state,
                post: action.payload
            }
        case LIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
                postsBySearch: state.postsBySearch.map(post => post._id === action.payload._id ? action.payload : post)
            }
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            }
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post),
                postsBySearch: state.postsBySearch.map((post) => post._id === action.payload._id ? action.payload : post),
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload.post._id),
                postsBySearch: state.postsBySearch.filter((post) => post._id !== action.payload.post._id),
                pageCount: action.payload.pageCount,
            }
        case CREATE_POST:
            return {
                ...state,
                posts: [action.payload.newPost, ...state.posts],
                postsBySearch: [action.payload.newPost, ...state.postsBySearch],
                pageCount: action.payload.pageCount,
            }
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.posts,
                pageCount: action.payload.pageCount,
            }
        case FETCH_POSTS_BY_SEARCH:
            return {
                ...state,
                postsBySearch: action.payload.posts,
                pageCount: action.payload.pageCount,
            }
        default:
            return state
    }
}

export default reducer