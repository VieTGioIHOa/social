import { SHOW_SKELETON, HIDE_SKELETON, SHOW_SPINNER, HIDE_SPINNER } from "../contants/actionType";

const initState = {
    isSkeleton: true,
    isSpinner: null
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case SHOW_SKELETON:
            return {
                ...state,
                isSkeleton: true
            }
        case HIDE_SKELETON:
            return {
                ...state,
                isSkeleton: false
            }
        case SHOW_SPINNER:
            return {
                ...state,
                isSpinner: true
            }
        case HIDE_SPINNER:
            return {
                ...state,
                isSpinner: false
            }
        default:
            return state
    }
}

export default reducer