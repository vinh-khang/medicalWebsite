import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";

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
    router.get('/api/get-user-by-email', userController.handleGetUserByEmail);
    router.post('/api/create-new-user', userController.handleCreateUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.handleGetAllcode);

    router.get('/api/get-top-doctor', doctorController.handleGetTopDoctor);
    router.get('/api/get-all-doctor', doctorController.handleGetAllDoctor);
    router.post('/api/create-detailed-info-doctor', doctorController.handleCreateDetailedInfoDoctor);
    router.get('/api/get-doctor-by-id', doctorController.handleGetDoctorById);
    router.get('/api/get-doctor-by-specialty', doctorController.handleGetDoctorBySpecialty);
    router.post('/api/bulk-create-data', doctorController.handleBulkCreate);
    router.delete('/api/delete-schedule', doctorController.handleDeleteSchedule);
    router.get('/api/get-doctor-schedule', doctorController.handleGetDoctorSchedule);

    router.post('/api/create-specialty', specialtyController.handleCreateSpecialty);
    router.put('/api/update-specialty', specialtyController.handleUpdateSpecialty);
    router.get('/api/get-specialty-by-id', specialtyController.handleGetSpecialty);
    router.delete('/api/delete-specialty', specialtyController.handleDeleteSpecialty);

    router.get('/api/get-booking-schedule', userController.handleGetBooking);
    router.put('/api/set-booking-schedule', userController.handleSetBooking);
    router.post('/api/create-booking-schedule', userController.handleCreateBooking);

    router.get('/api/clinic-info', clinicController.handleGetClinicInfo);
    router.put('/api/update-clinic-info', clinicController.handleUpdateClinicInfo);
    return app.use("/", router);
}

module.exports = initWebRoutes;