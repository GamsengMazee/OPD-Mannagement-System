require("../database/db");
const jwt = require("jsonwebtoken");
const PatientRegister = require("../model/patientSchema");
const Register = require("../model/registerSchema");
const bcrypt = require("bcryptjs");

//add or register Patient

exports.addPatient = (req, res) => {
  const {
    uid,
    name,
    address,
    age,
    ageFormat,
    sex,
    phone,
    occupation,
    consultant_room,
    relation,
    relationName,
    dor,
    token,
  } = req.body;

  //   const patient = new PatientRegister({name, address})

  if (!uid || !name || !address || !age || !ageFormat || !sex) {
    return res.json({ error: "Please Fill the required Fields" });
  } else {
    const patient = new PatientRegister({
      uid,
      name,
      address,
      age,
      ageFormat,
      sex,
      phone,
      occupation,
      consultant_room,
      relation,
      relationName,
      dor,
      token,
    });
    patient
      .save()
      .then(() => {
        res.status(201).json({ message: "user registered successfully" });
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to register" });
      });
  }
};

//Get Patients list from db
exports.getPatients = (req, res) => {
  PatientRegister.find()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
};

exports.updatePatients = async (req, res) => {
  const _id = req.params.id;
  try {
    const updatePatients = await PatientRegister.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).send(updatePatients);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.deletePatients = async (req, res) => {
  try {
    const deletePatient = await PatientRegister.findByIdAndDelete(
      req.params.id
    );
    if (!req.params.id) {
      return res.status(400).send("File not found");
    }
    res.status(200).send(deletePatient);
  } catch (error) {
    res.send(error.message);
  }
};

exports.registerUser = (req, res) => {
  const { name, password, dor } = req.body;
  if (!name || !password) {
    return;
  } else {
    const registerUser = new Register({ name, password, dor });
    registerUser
      .save()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  }
};

//Login
exports.loginUser = async (req, res) => {
  
  const { name, password } = req.body;
  if (!name || !password) {
    return;
  } else {
    try {
      const loginUser = await Register.findOne({ name: name });

      const isMatch = await bcrypt.compare(password, loginUser.password);

      const token = await loginUser.generateAuthToken();
      
      res.cookie("dontremove", token, {
        expires : new Date(Date.now() +  54000000) ,
        httpOnly: true
      });

      if (isMatch === true) {
        res.status(200).send(loginUser);
      } else {
        res.status(400).send("Invalid Credentials");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
};

//token Based auth
exports.auth = (req, res) => {
    res.send(req.rootUser)
}

//Delete old refresh token
exports.removeToken = async (req, res) => {
  
  try {
    const user = await Register.findById(req.params.id)
    
    if (!req.params.id) {
      return res.status(400).send("File not found");
    } 
   
    const removeToken = await Register.updateOne( {_id: req.params.id}, { $pullAll: {tokens: [user.tokens[0]] } } )

       if(!removeToken)(
          res.send('Failed to remove refresh Token')
       )
    res.status(200).send('Token Refreshed')
  } catch (error) {
    res.send(error.message);
  }
}
