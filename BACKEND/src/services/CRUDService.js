import bcrypt from 'bcryptjs';
import db from "../models/index";

var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPW = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPW,
                firstname: data.firstname,
                lastname: data.lastname,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === "1" ? true : false,
                role_id: data.roleid,
            })
            console.log(data);
            resolve("Tao thanh cong!");
        } catch (e) {
            reject(e);
        }
    })
}

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

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getDataById = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = await db.User.findOne({
                where: { id: userID },
                raw: true,
            })

            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.userid }
            })

            if (user) {
                user.firstname = data.firstname;
                user.lastname = data.lastname;
                user.address = data.address;
                await user.save();
                resolve();
            } else {
                resolve();
            }

        } catch (e) {
            console.log(e);
        }
    })
}

let deleteUser = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({
                where: { id: userID }
            })
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser,
    getAllUsers,
    getDataById,
    updateUser,
    deleteUser,
}