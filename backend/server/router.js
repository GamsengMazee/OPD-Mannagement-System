const express = require('express');
const router = express.Router();
const controller = require('./routerController');
const authenticate = require('../server/middleware/authenticate')


router.post('/addPatient', controller.addPatient)
router.get('/patientsRecords', controller.getPatients)
router.patch('/patientsUpdate/:id', controller.updatePatients)
router.delete('/patientsRecords/delete/:id', controller.deletePatients)
router.post('/register', controller.registerUser)
router.post('/', controller.loginUser)
router.get('/auth', authenticate, controller.auth)
router.patch('/removeToken/:id', controller.removeToken)


module.exports = router ;