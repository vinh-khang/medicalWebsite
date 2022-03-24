import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allTime: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState1 = { ...state };
            copyState1.isLoadingGender = true;
            return {
                ...copyState1,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState2 = { ...state };
            copyState2.genders = action.data;
            copyState2.isLoadingGender = false;
            return {
                ...copyState2,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            let copyState3 = { ...state };
            copyState3.genders = [];
            copyState3.isLoadingGender = false;
            return {
                ...copyState3,
            }
        case actionTypes.FETCH_POSITION_START:
            let copyState4 = { ...state };
            return {
                ...copyState4,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            let copyState5 = { ...state };
            copyState5.positions = action.data;
            return {
                ...copyState5,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            let copyState6 = { ...state };
            copyState6.positions = [];
            return {
                ...copyState6,
            }
        case actionTypes.FETCH_ROLE_START:
            let copyState7 = { ...state };
            return {
                ...copyState7,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyState8 = { ...state };
            copyState8.roles = action.data;
            return {
                ...copyState8,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            let copyState9 = { ...state };
            copyState9.roles = [];
            return {
                ...copyState9,
            }
        case actionTypes.FETCH_ALL_USER_START:
            let copyState10 = { ...state };
            return {
                ...copyState10,
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            let copyState11 = { ...state };
            copyState11.users = action.data;
            return {
                ...copyState11,
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            let copyState12 = { ...state };
            copyState12.users = [];
            return {
                ...copyState12,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            return {
                ...state,
                topDoctors: action.data,

            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            return {
                ...state,
                allDoctors: action.data,

            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            return {
                ...state,
            }
        case actionTypes.GET_TIME_RANGE_SUCCESS:
            return {
                ...state,
                allTime: action.data,

            }
        case actionTypes.GET_TIME_RANGE_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;