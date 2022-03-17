import db from "../models/index";
import bcrypt from 'bcryptjs';

let getTopDoctor = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                limit: limit,
                order: [["id", "DESC"]],
                where: { role_id: 'R2' },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['value_en', 'value_vi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['value_en', 'value_vi'] },
                ],
                raw: true,
                nest: true
            });

            if (!doctors) {
                resolve({
                    errCode: 1,
                    errMessage: 'Doctors do not exist!!!'
                });
            }

            resolve({
                errCode: 0,
                errMessage: 'OK',
                doctors,
            });
        }
        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getTopDoctor,
}