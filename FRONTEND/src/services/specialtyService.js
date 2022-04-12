import axios from '../axios';

const createSpecialty = (data) => {
    return axios.post('/api/create-specialty', data)
}

const editSpecialty = (data) => {
    return axios.put('/api/update-specialty', data)
}

const getSpecialty = (id) => {
    return axios.get(`/api/get-specialty-by-id?id=${id}`)
}

const deleteSpecialty = (id) => {
    return axios.delete('/api/delete-specialty', { data: { id: id } });
}
export {
    createSpecialty,
    editSpecialty,
    getSpecialty,
    deleteSpecialty
}