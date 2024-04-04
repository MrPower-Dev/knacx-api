const express = require('express')
require("dotenv").config()

const patientRouter = require('./routes/patient');

const app = express()

app.use(express.json());

const PORT = process.env.PORT || 8081


app.use('/api/patient', patientRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})


module.exports = app
