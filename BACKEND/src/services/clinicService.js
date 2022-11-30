import db from "../models/index";

let getClinicInfo = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (type) {
                if (type === 'ALL') {
                    let clinic = await db.Clinic.findAll({
                        raw: true
                    })
                    resolve({
                        errCode: 0,
                        clinic
                    })
                } else {
                    let clinic = await db.Clinic.findOne({
                        where: { type: type },
                        raw: true
                    })
                    resolve({
                        errCode: 0,
                        clinic
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


let updateClinicInfo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                let clinicInfo = await db.Clinic.findOne({
                    where: { type: data.type },
                    raw: false
                })

                if (clinicInfo) {
                    clinicInfo.title = data.title;
                    clinicInfo.clinic_Markdown = data.clinic_Markdown;
                    clinicInfo.clinic_HTML = data.clinic_HTML;
                    clinicInfo.clinic_image = data.clinic_image;
                    await clinicInfo.save();

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

module.exports = {
    getClinicInfo,
    updateClinicInfo,
}