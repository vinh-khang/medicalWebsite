import axios from '../axios';

const handleLoginAPI = (email, password, type) => {
    return axios.post('/api/login', { email, password, type })
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`);
}

const createUserAPI = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserAPI = (id) => {
    return axios.delete('/api/delete-user', { data: { id: id } });
}

const editUserAPI = (data) => {
    return axios.put('/api/edit-user', data)
}

const getAllcode = (type) => {
    return axios.get(`/api/allcode?type=${type}`);
}

const getTopDoctor = (limit) => {
    return axios.get(`/api/get-top-doctor?limit=${limit}`);
}

const getAllDoctor = () => {
    return axios.get(`/api/get-all-doctor`);
}

const createMoreInfoDoctor = (data) => {
    return axios.post('/api/create-detailed-info-doctor', data)
}

const getDoctorById = (id) => {
    return axios.get(`/api/get-doctor-by-id?id=${id}`)
}

const saveBulkSchedule = (data) => {
    return axios.post(`/api/bulk-create-data`, data)
}

const deleteScheduleInfo = (id) => {
    return axios.delete(`/api/delete-schedule?id=${id}`)
}

const getDoctorSchedule = (id, day) => {
    return axios.get(`/api/get-doctor-schedule?id=${id}&day=${day}`)
}

const getUserByEmail = (email) => {
    return axios.get(`/api/get-user-by-email?email=${email}`)
}

const getBookingSchedule = (id, type) => {
    return axios.get(`/api/get-booking-schedule?id=${id}&type=${type}`)
}

const setBookingSchedule = (data) => {
    return axios.put(`/api/set-booking-schedule`, data)
}

const createBookingSchedule = (data) => {
    return axios.post(`/api/create-booking-schedule`, data)
}



const getDoctorBySpecialty = (id) => {
    return axios.get(`/api/get-doctor-by-specialty?id=${id}`);
}



export {
    handleLoginAPI, getAllUsers, createUserAPI, deleteUserAPI, editUserAPI,
    getAllcode, getTopDoctor, getAllDoctor, createMoreInfoDoctor, getDoctorById,
    saveBulkSchedule, getDoctorSchedule, getUserByEmail, createBookingSchedule,
    getDoctorBySpecialty, getBookingSchedule, setBookingSchedule, deleteScheduleInfo
}