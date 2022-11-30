import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let type = req.body.type;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Vui long nhập đủ thông tin đăng nhập!',
        })
    }

    let userData = await userService.handleUserLogin(email, password, type);

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
        })
    }
    let users = await userService.getAllUsers(id);

    return res.status(200).json(users)
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

let handleGetUserByEmail = async (req, res) => {
    try {
        let data = await userService.getUserByEmail(req.query.email);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
        })
    }
}

let handleCreateBooking = async (req, res) => {
    let message = await userService.createBooking(req.body);
    return res.status(200).json(message);
}

let handleGetBooking = async (req, res) => {
    let message = await userService.getBooking(req.query.id, req.query.type);
    return res.status(200).json(message);
}

let handleSetBooking = async (req, res) => {
    let data = req.body;
    let message = await userService.setBooking(data);
    return res.status(200).json(message);
}

module.exports = {
    handleLogin,
    handleGetAllUsers,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    handleGetAllcode,
    handleGetUserByEmail,
    handleCreateBooking,
    handleGetBooking,
    handleSetBooking,
}