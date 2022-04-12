import specialtyService from "../services/specialtyService";

let handleCreateSpecialty = async (req, res) => {
    let message = await specialtyService.createSpecialty(req.body);
    return res.status(200).json(message);
}

let handleUpdateSpecialty = async (req, res) => {
    let message = await specialtyService.updateSpecialty(req.body);
    return res.status(200).json(message);
}

let handleGetSpecialty = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
        })
    }
    let message = await specialtyService.getSpecialty(id);
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
    handleGetSpecialty,
    handleDeleteSpecialty,
    handleUpdateSpecialty
}