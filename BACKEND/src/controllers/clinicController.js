import clinicService from "../services/clinicService";

let handleCreateSpecialty = async (req, res) => {
    let message = await specialtyService.createSpecialty(req.body);
    return res.status(200).json(message);
}

let handleUpdateClinicInfo = async (req, res) => {
    let message = await clinicService.updateClinicInfo(req.body);
    return res.status(200).json(message);
}

let handleGetClinicInfo = async (req, res) => {
    let type = req.query.type;
    if (!type) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
        })
    }
    let message = await clinicService.getClinicInfo(type);
    return res.status(200).json(message);
}

let handleDeleteSpecialty = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await specialtyService.deleteSpecialty(req.body.id);

    return res.status(200).json(message);

}

module.exports = {
    handleCreateSpecialty,
    handleGetClinicInfo,
    handleDeleteSpecialty,
    handleUpdateClinicInfo
}