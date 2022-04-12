import db from "../models/index";
import bcrypt from 'bcryptjs';

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                await db.Specialty.create({
                    specialty_name: data.specialty_name,
                    specialty_Markdown: data.specialty_Markdown,
                    specialty_HTML: data.specialty_HTML,
                    specialty_image: data.specialty_image,
                    specialty_price: data.specialty_price,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                });
            } else {
                resolve({
                    errCode: 1,
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                let spe = await db.Specialty.findOne({
                    where: { id: data.id },
                    raw: false
                })

                if (spe) {
                    spe.specialty_name = data.specialty_name;
                    spe.specialty_Markdown = data.specialty_Markdown;
                    spe.specialty_HTML = data.specialty_HTML;
                    spe.specialty_image = data.specialty_image;
                    spe.specialty_price = data.specialty_price;
                    await spe.save();

                    resolve({
                        errCode: 0,
                        errMessage: 'OK'
                    });
                } else {
                    resolve({ errCode: 1, });
                }

            } else {
                resolve({
                    errCode: 1,
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getSpecialty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id) {
                let specialty = '';
                if (id === 'ALL') {
                    specialty = await db.Specialty.findAll({
                        raw: true
                    })
                    resolve({
                        errCode: 0,
                        specialty
                    })
                } else {
                    specialty = await db.Specialty.findOne({
                        where: { id: id },
                        raw: true
                    })
                    resolve({
                        errCode: 0,
                        specialty
                    })
                }

            } else {
                resolve({
                    errCode: 1,
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteSpecialty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = await db.Specialty.findOne({
                where: { id: id }
            })

            if (!specialty) {
                resolve({
                    errCode: 1,
                    errMessage: 'Specialty does not exist!'
                });
            }

            await db.Specialty.destroy({
                where: { id: id }
            })

            resolve({
                errCode: 0,
                errMessage: 'OK'
            });
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createSpecialty,
    getSpecialty,
    deleteSpecialty,
    updateSpecialty,
}