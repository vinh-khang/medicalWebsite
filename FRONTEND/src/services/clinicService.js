import axios from '../axios';

const getClinicInfo = (type) => {
    return axios.get(`/api/clinic-info?type=${type}`)
}

const updateClinicInfo = (data) => {
    return axios.put('/api/update-clinic-info', data)
}


export {
    getClinicInfo,
    updateClinicInfo,
}
