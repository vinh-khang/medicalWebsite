import actionTypes from './actionTypes';
import { getAllcode, createUserAPI, getAllUsers, deleteUserAPI, editUserAPI, getTopDoctor } from '../../services/userService';
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
                toast.success("Create new user successfully!");
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(createUserFailed());
                toast.success("Your Email is existed!")
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
            let res1 = await getTopDoctor(2);
            console.log('Bac si');
            console.log(res1);
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUsersFailed());
                console.log()
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
            // console.log(id);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                toast.success("Delete user successfully!");
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(deleteUserFailed());
                toast.success("Delete user failed!");
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



