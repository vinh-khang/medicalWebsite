const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',

    //admin
    //gender
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',

    //position
    FETCH_POSITION_START: 'FETCH_POSITION_START',
    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAILED: 'FETCH_POSITION_FAILED',

    //role
    FETCH_ROLE_START: 'FETCH_ROLE_START',
    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',

    //Create user
    CREATE_USER_START: 'CREATE_USER_START',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',

    EDIT_USER_START: 'EDIT_USER_START',
    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',

    //Delete user
    DELETE_USER_START: 'DELETE_USER_START',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',

    //Table manage
    FETCH_ALL_USER_START: 'FETCH_ALL_USER_START',
    FETCH_ALL_USER_SUCCESS: 'FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAILED: 'FETCH_ALL_USER_FAILED',

    //Get Top Doctor
    FETCH_TOP_DOCTOR_SUCCESS: 'FETCH_TOP_DOCTOR_SUCCESS',
    FETCH_TOP_DOCTOR_FAILED: 'FETCH_TOP_DOCTOR_FAILED',

    //Get All Doctor
    FETCH_ALL_DOCTOR_SUCCESS: 'FETCH_ALL_DOCTOR_SUCCESS',
    FETCH_ALL_DOCTOR_FAILED: 'FETCH_ALL_DOCTOR_FAILED',

    //CREATE MOR INFO Doctor
    CREATE_MORE_INFO_DOCTOR_SUCCESS: 'CREATE_MORE_INFO_DOCTOR_SUCCESS',
    CREATE_MORE_INFO_DOCTOR_FAILED: 'CREATE_MORE_INFO_DOCTOR_FAILED',

    //CREATE MOR INFO Doctor
    GET_DOCTOR_ID_SUCCESS: 'GET_DOCTOR_ID_SUCCESS',
    GET_DOCTOR_ID_FAILED: 'GET_DOCTOR_ID_FAILED',

    //FETCH ALL TIME RANGE
    GET_TIME_RANGE_SUCCESS: 'GET_TIME_RANGE_SUCCESS',
    GET_TIME_RANGE_FAILED: 'GET_TIME_RANGE_FAILED',

    //SPECIALTY
    CREATE_SPECIALTY_SUCCESS: 'CREATE_SPECIALTY_SUCCESS',
    CREATE_SPECIALTY_FAILED: 'CREATE_SPECIALTY_FAILED',
})

export default actionTypes;