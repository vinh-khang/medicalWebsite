import actionTypes from './actionTypes';
import {
    getAllcode, createUserAPI, getAllUsers, deleteUserAPI, editUserAPI, getTopDoctor,
    getAllDoctor, createMoreInfoDoctor
} from '../../services/userService';
import { createSpecialty } from '../../services/specialtyService';
import { toast } from "react-toastify";
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllcode('GENDER');

            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log(e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START })
            let res = await getAllcode('Position');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log(e);
        }
    }
}

export const fetchPositionSuccess = (PositionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: PositionData,
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await getAllcode('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log(e);
        }
    }
}

export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData,
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_USER_START })
            let res = await createUserAPI(data);
            if (res && res.errCode === 0) {
                dispatch(createUserSuccess());
                toast.success("Đăng ký tài khoản thành công, xin mời đăng nhập!");
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(createUserFailed());
                toast.error("Email của bạn đã tồn tại, vui lòng nhập Email khác!")
            }
        } catch (e) {
            dispatch(createUserFailed());
            console.log(e);
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


//Table manage
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_USER_START })
            let res = await getAllUsers('ALL');
            console.log('res', res)
            if (res) {
                dispatch(fetchAllUsersSuccess(res.reverse()))
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.log(e);
        }
    }
}

export const fetchAllUsersSuccess = (AllUsersData) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: AllUsersData
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

//Table manage
export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_USER_START })
            let res = await deleteUserAPI(id);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                toast.success("Delete user successfully!");
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(deleteUserFailed());
                toast.error("Delete user failed!");
            }
        } catch (e) {
            dispatch(deleteUserFailed());
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.EDIT_USER_START })
            let res = await editUserAPI(data);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess());
                toast.success("Update new user successfully!");
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(editUserFailed());
            }
        } catch (e) {
            dispatch(editUserFailed());
            console.log(e);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

//Top Doctor
export const fetchTopDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS })
            let res = await getTopDoctor(8);
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.doctors))
            } else {
                dispatch(fetchTopDoctorFailed());
            }
        } catch (e) {
            dispatch(fetchTopDoctorFailed());
        }
    }
}

export const fetchTopDoctorSuccess = (TopDoctorData) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    data: TopDoctorData
})

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
})


//All doctor
export const fetchAllDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS })
            let res = await getAllDoctor();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.doctors))
            } else {
                dispatch(fetchAllDoctorsFailed());
            }
        } catch (e) {
            dispatch(fetchAllDoctorsFailed());
        }
    }
}

export const fetchAllDoctorsSuccess = (AllDoctorData) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    data: AllDoctorData
})

export const fetchAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
})

//All doctor
export const createMoreInfoDoctorStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_MORE_INFO_DOCTOR_SUCCESS })
            let res = await createMoreInfoDoctor(data);
            if (res && res.errCode === 0) {
                dispatch(createMoreInfoDoctorSuccess());
                toast.success("Add more information for doctor successfully!");
            } else {
                dispatch(createMoreInfoDoctorFailed());
                toast.error("Add more information for doctor unsuccessfully!");
            }
        } catch (e) {
            dispatch(createMoreInfoDoctorFailed());
        }
    }
}

export const createMoreInfoDoctorSuccess = () => ({
    type: actionTypes.CREATE_MORE_INFO_DOCTOR_SUCCESS,
})

export const createMoreInfoDoctorFailed = () => ({
    type: actionTypes.CREATE_MORE_INFO_DOCTOR_FAILED
})

//All doctor
export const getTimeRangeStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_TIME_RANGE_SUCCESS })
            let res = await getAllcode('TIME');

            if (res && res.errCode === 0) {
                dispatch(getTimeRangeSuccess(res.data));
            } else {
                dispatch(getTimeRangeFailed());
            }
        } catch (e) {
            dispatch(getTimeRangeFailed());
        }
    }
}

export const getTimeRangeSuccess = (data) => ({
    type: actionTypes.GET_TIME_RANGE_SUCCESS,
    data: data
})

export const getTimeRangeFailed = () => ({
    type: actionTypes.GET_TIME_RANGE_FAILED
})

//Specialty
export const createSpecialtyStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_USER_START })
            let res = await createSpecialty(data);
            if (res && res.errCode === 0) {
                dispatch(createSpecialtySuccess());
                toast.success("Create new Specialty successfully!");
            } else {
                dispatch(createSpecialtyFailed());
                toast.error("Create new Specialty failed!")
            }
        } catch (e) {
            dispatch(createSpecialtyFailed());
            console.log(e);
        }
    }
}

export const createSpecialtySuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const createSpecialtyFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})




