import db from "../models/index";
require('dotenv').config();
import _, { reject } from 'lodash';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

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

let handleBulkCreate = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let schedule = data.arrSchedule;
            if (!schedule) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters!',
                })
            }

            if (schedule && schedule.length > 0) {
                schedule.map((item, index) => {
                    item.max_number = MAX_NUMBER_SCHEDULE;
                    return item;
                })
            }

            let existedSchedule = await db.Schedule.findAll({
                where: { doctor_id: schedule[0].doctor_id, date: new Date(schedule[0].date) },
                attributes: ['doctor_id', 'date', 'time_type', 'max_number'],
                raw: true
            })

            console.log(schedule[0].date)

            if (existedSchedule && existedSchedule.length > 0) {
                existedSchedule.map((item, index) => {
                    item.date = new Date(item.date).getTime();
                    return item;
                })
            }

            let createdValue = _.differenceWith(schedule, existedSchedule, (a, b) => {
                return a.time_type === b.time_type && a.date === b.date;
            })

            if (createdValue && createdValue.length > 0) {
                await db.Schedule.bulkCreate(createdValue);
            }

            resolve({
                errCode: 0,
                errMessage: 'OK',
            })
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetDoctorSchedule = async (id, day) => {
    return new Promise(async (resolve, reject) => {
        try {
            let existedSchedule = await db.Schedule.findAll({
                where: { doctor_id: id, date: new Date(+day) },
                raw: true
            })
            resolve({
                errCode: 0,
                errMessage: 'OK',
                existedSchedule,
            })

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getTopDoctor,
    getAllDoctor,
    createDetailedInfoDoctor,
    getDoctorById,
    handleBulkCreate,
    handleGetDoctorSchedule
}