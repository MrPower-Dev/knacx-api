const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const patientController = require('../controllers/patientController');
const Patient = require('../models/patient');

// route for get all data from patient table
router.get('/', patientController.index);

// route for insert data to patient table
router.post('/', [
    // set validate not empty string
    body('first_name').not().isEmpty().withMessage('First name is required'),
    body('last_name').not().isEmpty().withMessage('Last name is required'),
    body('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address.').custom(async (email) => {
        const existingEmail = await Patient.findOne({ where: { email: email } })
        if (existingEmail) {
            throw new Error('Email is already.')
        }
    }),
    body('phone_number').not().isEmpty().withMessage('Phone number is required'),
], patientController.insert);
        
// // route for update data to patient table
router.put('/:id', [
    // set validate not empty string
    body('first_name').not().isEmpty().withMessage('First name is required'),
    body('last_name').not().isEmpty().withMessage('Last name is required'),
    body('phone_number').not().isEmpty().withMessage('Phone number is required'),
], patientController.update);

// route for delete data to patient table
router.delete('/:id', patientController.delete);

module.exports = router;
