import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing Input',
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {

    let id = req.query.id; // All, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users
        })
    }
    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleCreateUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUser(data);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);

}

let handleGetAllcode = async (req, res) => {
    try {
        let data = await userService.getAllcode(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
        })
    }
}

module.exports = {
    handleLogin,
    handleGetAllUsers,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    handleGetAllcode,
}