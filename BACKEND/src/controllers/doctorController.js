import doctorService from "../services/doctorService";

let handleGetTopDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 8;
    let data = await doctorService.getTopDoctor(+limit);
    return res.status(200).json(data);
}

let handleGetAllDoctor = async (req, res) => {
    let data = await doctorService.getAllDoctor();
    return res.status(200).json(data);
}

let handleCreateDetailedInfoDoctor = async (req, res) => {
    let message = await doctorService.createDetailedInfoDoctor(req.body);
    return res.status(200).json(message);
}

let handleGetDoctorById = async (req, res) => {
    let id = req.query.id;
    let data = await doctorService.getDoctorById(id);
    return res.status(200).json(data);
}

let handleBulkCreate = async (req, res) => {
    let data = await doctorService.handleBulkCreate(req.body);
    return res.status(200).json(data);
}

let handleDeleteSchedule = async (req, res) => {
    let id = req.query.id;
    let data = await doctorService.handleDeleteSchedule(id);
    return res.status(200).json(data);
}

let handleGetDoctorSchedule = async (req, res) => {
    let id = req.query.id;
    let day = req.query.day;
    let data = await doctorService.handleGetDoctorSchedule(id, day);
    return res.status(200).json(data);
}

let handleGetDoctorBySpecialty = async (req, res) => {
    let spe_id = req.query.id;
    let data = await doctorService.handleGetDoctorBySpecialty(spe_id);
    return res.status(200).json(data);
}

module.exports = {
    handleGetTopDoctor,
    handleGetAllDoctor,
    handleCreateDetailedInfoDoctor,
    handleGetDoctorById,
    handleBulkCreate,
    handleGetDoctorSchedule,
    handleGetDoctorBySpecialty,
    handleDeleteSchedule
}