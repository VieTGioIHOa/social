import { combineReducers } from 'redux'

import posts from './posts'
import auth from './auth'
import loading from './loading'

export default combineReducers({
    posts,
    auth,
    loading
})