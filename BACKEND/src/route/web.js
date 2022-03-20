import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomepage);
    router.post('/post-crud', homeController.getCRUD);
    router.get('/get-all-users', homeController.getAllUsers);
    router.get('/edit-crud', homeController.editCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.handleGetAllcode);

    router.get('/api/get-top-doctor', doctorController.handleGetTopDoctor);
    router.get('/api/get-all-doctor', doctorController.handleGetAllDoctor);
    return app.use("/", router);
}

module.exports = initWebRoutes;