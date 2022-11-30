import db from "../models/index";
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password, type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'role_id', 'password', 'firstname', 'lastname', 'id'],
                    where: { email: email },
                    raw: true
                })

                let check = bcrypt.compareSync(password, user.password);
                if (user && type !== 'HP') {
                    if (check) {
                        if (user.role_id === 'R3') {
                            userData.errCode = 2;
                            userData.errMessage = 'Tài khoản không tồn tại!';
                        } else {
                            userData.errCode = 0;
                            userData.errMessage = "OK";
                            delete user.password;
                            userData.user = user;
                        }
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Sai mật khẩu!";
                    }
                } else if (user && type === 'HP') {
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "Sai mật khẩu!";
                    }
                } else {
                    userData, errCode = 2;
                    userData, errMessage = "Tài khoản không tồn tại!";
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = 'Không tìm thấy email, vui lòng nhập lại!';

            }

            resolve(userData);
        } catch (e) {
            reject(e)
        }
    })
}


let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email }
            })

            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (id === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    order: [['role_id', 'DESC']]
                });
                resolve(users);
            }

            if (id && id !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password']
                    }
                });
                let gender = await db.Allcode.findOne({
                    where: { keyMap: users.gender },
                    raw: true
                })

                if (gender.value_vi) {
                    users.gender_value = gender.value_vi;
                    resolve({
                        errCode: 0,
                        errMessage: 'OK',
                        users
                    })
                }
            }

        } catch (e) {
            reject(e);
        }
    })
}

var salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!await checkUserEmail(data.email)) {
                let hashPW = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPW,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    role_id: data.role_id,
                    position_id: data.position_id,
                    image: data.image,
                })



                if (data.role_id === 'R2') {
                    let doctor = await db.User.findOne({
                        where: { email: data.email },
                        raw: true
                    })
                    await db.DoctorDetail.create({
                        doctor_id: doctor.id,
                        specialty_id: 1,
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'This email address is already being used'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })

            if (user && user.role_id === 'R2') {
                await db.User.destroy({
                    where: { id: id }
                })

                await db.DoctorDetail.destroy({
                    where: { doctor_id: id }
                })

                await db.DetailedInformation.destroy({
                    where: { doctor_id: id }
                })

                await db.Schedule.destroy({
                    where: { doctor_id: id }
                })

            } else {
                await db.User.destroy({
                    where: { id: id }
                })
            }

            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: 'User does not exist!'
                });
            }

            resolve({
                errCode: 0,
                errMessage: 'OK'
            });
        } catch (e) {
            reject(e)
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters!'
                });
            }

            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })

            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: 'User does not exist!!!'
                });
            }

            if (user) {
                user.firstname = data.firstname;
                user.lastname = data.lastname;
                user.phonenumber = data.phonenumber;
                user.address = data.address;
                user.gender = data.gender;
                user.position_id = data.position_id;
                user.role_id = data.role_id;
                if (data.image) {
                    user.image = data.image;
                }

                await user.save();

                let spe = await db.DoctorDetail.findOne({
                    where: { doctor_id: data.id },
                    raw: false
                })

                if (data.role_id === 'R2' && !spe) {
                    await db.DoctorDetail.create({
                        doctor_id: data.id,
                        specialty_id: 1,
                    })
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

let getAllcode = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (typeInput) {
                let data = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                resolve({
                    errCode: 0,
                    data: data
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getUserByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (email) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: {
                        exclude: ['password']
                    },

                });

                let gender = await db.Allcode.findOne({
                    where: { keyMap: user.gender },
                    raw: true
                })

                if (gender.value_vi) {
                    user.gender_value = gender.value_vi;
                    resolve({
                        errCode: 0,
                        errMessage: 'OK',
                        user,
                    })
                }

            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let createBooking = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                let schedule = await db.Schedule.findOne({
                    where: { date: data.date, time_type: data.time_type, doctor_id: data.doctor_id },
                    raw: false
                })

                if (schedule.current_number) {
                    schedule.current_number = schedule.current_number + 1;
                    if (schedule.current_number > 5) {
                        resolve({
                            errCode: 1,
                            errMessage: 'Quá số lượng quy định trong thời gian này!'
                        });
                    }
                } else {
                    schedule.current_number = 1;
                    await schedule.save();
                }

                let booking = await db.Booking.findOne({
                    where: { date: data.date, time_type: data.time_type, doctor_id: data.doctor_id },
                    raw: false
                })

                if (booking) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Trùng với lịch đã đăng ký của bạn!'
                    });
                } else {
                    await db.Booking.create({
                        status_id: 'S1',
                        doctor_id: data.doctor_id,
                        patient_id: data.patient_id,
                        date: data.date,
                        time_type: data.time_type,
                        booking_price: data.price,
                        payment: data.payment,
                        room: data.room
                    });

                    await schedule.save();

                    resolve({
                        errCode: 0
                    });
                }

            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu thông tin đặt khám, vui lòng thao tác lại!!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getBooking = (id, type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id === 'ALL' && type === 'admin') {
                let booking = await db.Booking.findAll({
                    include: [
                        { model: db.Allcode, as: 'statusData', attributes: ['value_en', 'value_vi'] },
                        { model: db.Allcode, as: 'timetypeData', attributes: ['value_en', 'value_vi'] },
                        { model: db.User, as: 'patientData', attributes: ['firstname', 'lastname'] },
                        { model: db.User, as: 'doctorData', attributes: ['firstname', 'lastname'] },
                    ],
                    raw: true,
                    nest: true,
                    order: [
                        ['status_id', 'ASC'],
                        ['id', 'DESC']
                    ]

                });

                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    booking
                })

            } else if (id !== 'ALL' && type === 'patient') {
                let booking = await db.Booking.findAll({
                    include: [
                        { model: db.Allcode, as: 'statusData', attributes: ['value_en', 'value_vi'] },
                        { model: db.Allcode, as: 'timetypeData', attributes: ['value_en', 'value_vi'] },
                        { model: db.User, as: 'patientData', attributes: ['firstname', 'lastname'] },
                        { model: db.User, as: 'doctorData', attributes: ['firstname', 'lastname'] },
                    ],
                    where: { patient_id: id },
                    raw: true,
                    nest: true,
                    order: [
                        ['status_id', 'ASC'],
                        ['id', 'DESC']
                    ]

                });

                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    booking
                })
            } else if (id !== 'ALL' && type === 'doctor') {
                let booking = await db.Booking.findAll({
                    include: [
                        { model: db.Allcode, as: 'statusData', attributes: ['value_en', 'value_vi'] },
                        { model: db.Allcode, as: 'timetypeData', attributes: ['value_en', 'value_vi'] },
                        { model: db.User, as: 'patientData', attributes: ['firstname', 'lastname'] },
                        { model: db.User, as: 'doctorData', attributes: ['firstname', 'lastname'] },
                    ],
                    where: { doctor_id: id },
                    raw: true,
                    nest: true,
                    order: [
                        ['status_id', 'ASC'],
                        ['id', 'DESC']
                    ]

                });

                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    booking
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let setBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = await db.Booking.findOne({
                where: { id: data.id },
                raw: false
            })

            if (data.type === 'STATUS') {
                if (booking) {
                    booking.status_id = data.status_id;
                    await booking.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'OK'
                    });
                } else {
                    resolve();
                }
            } else {
                resolve();
            }

        } catch (e) {
            console.log(e);
        }
    })
}


module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
    getAllcode,
    getUserByEmail,
    createBooking,
    setBooking,
    getBooking,
}