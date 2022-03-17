import doctorService from "../services/doctorService";

let handleGetTopDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 8;
    let data = await doctorService.getTopDoctor(+limit);

    return res.status(200).json(data);
}

module.exports = {
    handleGetTopDoctor,
}