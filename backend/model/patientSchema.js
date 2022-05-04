const mongoose = require('mongoose');
const { Schema } = mongoose;

const patientSchema = new Schema({
    uid: {
      type: String,
      required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    ageFormat: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    occupation: {
        type: String
    },
    consultant_room: {
        type: String
    },
    relation: {
        type: String
    },
    relationName: {
        type: String
    },
    dor: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true
    }
})

const PatientRegister = mongoose.model('PatientRegister', patientSchema)

module.exports = PatientRegister;