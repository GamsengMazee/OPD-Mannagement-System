const jwt = require('jsonwebtoken')
const Register = require('../../model/registerSchema')

const authenticate = async (req, res, next) => {
     try {
          const token = req.cookies.dontremove;
          
          const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
         
          
          const rootUser = await Register.findOne({_id:verifyToken._id, "tokens.token": token})
         
          if(!rootUser){throw new Error('User not Found')}

          req.token = token;
          req.rootUser = rootUser
          req.userId = rootUser._id;

          next()
        } catch (error) {
         res.status(401).send('Unauthorized Access')
     }
}

module.exports = authenticate;