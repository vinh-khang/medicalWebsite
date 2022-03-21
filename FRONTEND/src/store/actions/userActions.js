import actionTypes from './actionTypes';
import { getAllcode, createUserAPI, getAllUsers, deleteUserAPI, editUserAPI, getTopDoctor, getAllDoctor, createMoreInfoDoctor, getDoctorById } from '../../services/userService';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})


//Get doctor by id
export const getDoctorIDStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_DOCTOR_ID_SUCCESS })
            let res = await getDoctorById(id);
            if (res && res.errCode === 0) {
                dispatch(getDoctorIDSuccess(res.doctors));
            } else {
                dispatch(getDoctorIDFailed());
            }
        } catch (e) {
            dispatch(getDoctorIDFailed());
        }
    }
}

export const getDoctorIDSuccess = (data) => ({
    type: actionTypes.GET_DOCTOR_ID_SUCCESS,
    data: data,
})

export const getDoctorIDFailed = () => ({
    type: actionTypes.GET_DOCTOR_ID_FAILED
})
