import axios from '../axios';

const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', { email, password })
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


export { handleLoginAPI, getAllUsers, createUserAPI, deleteUserAPI, editUserAPI, getAllcode, getTopDoctor, getAllDoctor, createMoreInfoDoctor, getDoctorById }