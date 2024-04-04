const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const Patient = require('../models/patient');

exports.index = async (req, res, next) => {
    try {
        // select all data from patient table
        const patient = await Patient.findAll();

        // response all data from patient table
        res.status(200).json({
            data: patient
        });

    } catch (error) {
        // response error
        res.status(500).json({
            error: {
                message: error.message
            }
        });
    }
}

exports.insert = async (req, res, next) => {
    try {
        // get request body
        const { first_name, last_name, email, phone_number, congenital_disease } = req.body;
        
        // validation result from routes
        const errors = validationResult(req);
        // set error message
        if (!errors.isEmpty()) {
            const error = new Error('validation error')
            error.validation = errors.array();
            throw error;
        }

        // add value from request body to model Patient
        let patient = new Patient();
        patient.first_name = first_name;
        patient.last_name = last_name;
        patient.email = email;
        patient.phone_number = phone_number;
        patient.congenital_disease = congenital_disease === "" ? null : congenital_disease;    
        
        // insert value into database
        await patient.save();

        // response message successfully
        res.status(200).json({ 
            message: 'Insert successfully.'
        });
        
    } catch (error) {
        // response error
        res.status(400).json({ 
            error: {
                message: error.message,
                validation: error.validation ?? ''
            }
        });
    }
}

exports.update = async (req, res, next) => {
    try {
        // get request body
        const { first_name, last_name, phone_number } = req.body;
        const id = parseInt(req.params.id);

        // validation result from routes
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // set error message
            const error = new Error('validation error')
            error.validation = errors.array();
            throw error;
        }

        // check data from id request params
        const patient = await Patient.findByPk( req.params.id );
        if (patient === null) {
            // set error message
            throw new Error('Data not found');
        }

        // update value to database
        await Patient.update({
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
        }, {
            where: {
              id: id,
            },
        });

        // response message successfully
        res.status(200).json({ 
            message: 'Update successfully.'
        });

    } catch (error) {
        // response error
        res.status(400).json({ 
            error: {
                message: error.message,
                validation: error.validation ?? ''
            }
        });
    }
}

exports.delete = async (req, res, next) => {
    try {

        // check data from id request params
        const patient = await Patient.findByPk( req.params.id );

        if (patient === null) {
            // set error message
            throw new Error('Data not found');
        }

        // delete row from patient table
        Patient.destroy({
            where: {
                id: req.params.id
            }
        })

        // response message successfully
        res.status(200).json({ message: 'Delete successfully.' });

    } catch (error) {
        // response error
        res.status(400).json({ 
            error: {
                message: error.message
            }
        });
    }
}
