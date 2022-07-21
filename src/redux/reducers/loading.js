import { SHOW_LOADING, HIDE_LOADING } from "../contants/actionType";

const reducer = (isLoading = true, action) => {
    switch (action.type) {
        case SHOW_LOADING:
            return isLoading = true
        case HIDE_LOADING:
            return isLoading = false
        default:
            return isLoading
    }
}

export default reducer