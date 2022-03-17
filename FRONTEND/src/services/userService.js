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


export { handleLoginAPI, getAllUsers, createUserAPI, deleteUserAPI, editUserAPI, getAllcode, getTopDoctor }