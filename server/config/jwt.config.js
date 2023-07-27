const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY

module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.userToken, SECRET_KEY, (err, payload) => {
    if (err) { 
      console.log("authentication error")
      res.status(401).json({verified: false});
    } else {
      console.log("Authenticated!")
      next();
    }
  });
}