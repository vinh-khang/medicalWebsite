import db from "../models/index";
import bcrypt from 'bcryptjs';


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'role_id', 'password', 'firstname', 'lastname'],
                    where: { email: email },
                    raw: true
                })

                if (user) {
                    let check = bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong Password";
                    }
                } else {
                    userData, errCode = 2;
                    userData, errMessage = "User not found";
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = 'Email khong ton tai';

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
                    }
                });
            }

            if (id && id !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password']
                    }
                });
            }

            resolve(users);
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

            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: 'User does not exist!'
                });
            }

            await db.User.destroy({
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

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.position_id || !data.role_id || !data.gender) {
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
                user.phonenumber = data.phone;
                user.address = data.address;
                user.gender = data.gender;
                user.position_id = data.position_id;
                user.role_id = data.role_id;
                if (data.image) {
                    user.image = data.image;
                }
                await user.save();

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
                resolve({
                    errCode: 0,
                    user: user,
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

let createBooking = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                let booking = await db.Booking.findOne({
                    where: { date: data.date, time_type: data.time_type, doctor_id: data.doctor_id },
                    raw: false
                })

                if (!booking) {
                    await db.Booking.create({
                        status_id: 'S1',
                        doctor_id: data.doctor_id,
                        patient_id: data.patient_id,
                        date: data.date,
                        time_type: data.time_type,
                    })
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: 'Trùng lịch rồi!'
                    });
                }

                let schedule = await db.Schedule.findOne({
                    where: { date: data.date, time_type: data.time_type, doctor_id: data.doctor_id },
                    raw: false
                })

                if (schedule.current_number) {
                    schedule.current_number = schedule.current_number + 1;
                    if (schedule.current_number > 5) {
                        resolve({
                            errCode: 1,
                            errMessage: 'Quá số lượng quy định!'
                        });
                    } else {
                        await schedule.save();
                    }
                } else {
                    schedule.current_number = 1;
                    await schedule.save();
                }

                console.log(schedule)

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

module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
    getAllcode,
    getUserByEmail,
    createBooking,
}