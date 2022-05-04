const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Schema } = mongoose;

const registerSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
    },
    dor: {
      type: String
    },
    tokens: [{
       token:{
          type: String,
          required: true
       }
    }]
})

//hash password
registerSchema.pre("save", async function(next){
     if(this.isModified('password')){
      this.password = await bcrypt.hash(this.password, 10)
     }
  next()
})

//Genereate Token
registerSchema.methods.generateAuthToken = async function() {
    try {
       let genaratedToken = jwt.sign({_id:this._id}, process.env.SECRET_KEY)
       this.tokens = this.tokens.concat({token: genaratedToken})
       await this.save()
       return genaratedToken;
    } catch (error) {
       console.log(error.message)
    }
}

const Register = mongoose.model('Register', registerSchema)

module.exports = Register;