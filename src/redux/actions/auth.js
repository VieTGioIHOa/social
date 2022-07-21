import * as api from '../../api'
import { AUTH } from '../contants/actionType'
import { toast } from 'react-toastify'

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData)
        dispatch({ type: AUTH, data })
        navigate('/')
    } catch ({ response: { data } }) {
        toast.error(data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
}

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)

        dispatch({ type: AUTH, data })

        navigate('/')
    } catch ({ response: { data } }) {
        toast.error(data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
}

