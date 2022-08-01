import { SHOW_SKELETON, HIDE_SKELETON, SHOW_SPINNER, HIDE_SPINNER } from '../contants/actionType'


export const showSkeleton = () => ({
    type: SHOW_SKELETON
})

export const hideSkeleton = () => ({
    type: HIDE_SKELETON
})

export const showSpinner = () => ({
    type: SHOW_SPINNER
})

export const hideSpinner = () => ({
    type: HIDE_SPINNER
})
