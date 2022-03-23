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
                    errMessage: 'Doctors is not existed!!!'
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

let getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                order: [["id", "DESC"]],
                where: { role_id: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
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
                    errMessage: 'List Doctors is empty!!!'
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

let createDetailedInfoDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctor_id || !data.contentHTML || !data.contentMarkdown || !data.action) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters!'
                });
            } else {
                if (data.action === 'CREATE') {
                    await db.DetailedInformation.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctor_id: data.doctor_id,
                    })

                } else {
                    if (data.action === 'EDIT') {
                        let doctor = await db.DetailedInformation.findOne({
                            where: { doctor_id: data.doctor_id },
                            raw: false
                        })

                        if (doctor) {
                            doctor.contentHTML = data.contentHTML;
                            doctor.contentMarkdown = data.contentMarkdown;
                            doctor.description = data.description;
                            doctor.doctor_id = data.doctor_id;
                            await doctor.save()
                        }
                    }
                }

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findOne({
                where: { id: id },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['value_en', 'value_vi'] },
                    { model: db.DetailedInformation, attributes: ['contentHTML', 'contentMarkdown', 'description'] }
                ],
                raw: true,
                nest: true
            });

            if (!doctors) {
                resolve({
                    errCode: 1,
                    errMessage: 'Doctors is not existed!!!',
                    doctors: {},
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
    getAllDoctor,
    createDetailedInfoDoctor,
    getDoctorById,
}