import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomepage = async (req, res) => {
    let data = await db.User.findAll();
    return res.render('homepage.ejs', {
        data: JSON.stringify(data)
    });
}

let getCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("Post CRUD from Server");
}

let getAllUsers = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    return res.render('getAllUsers.ejs', {
        dataTable: data

    });
}

let editCRUD = async (req, res) => {
    let userId = req.query.id;
    let userData = await CRUDService.getDataById(userId);
    return res.render("editCRUD.ejs", {
        dataTable: userData
    })
}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDService.updateUser(data);
    return res.redirect("/get-all-users");
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    await CRUDService.deleteUser(userId);
    return res.redirect("/get-all-users");
}

module.exports = {
    getHomepage,
    getCRUD,
    getAllUsers,
    editCRUD,
    putCRUD,
    deleteCRUD,
}