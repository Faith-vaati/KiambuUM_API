const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.cookies.cilbup_ksa;

  if (!token) {
    return res.status(403).send({message:"A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, config.USR_TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({message:"Invalid Token"});
  }
  return next();
};

module.exports = verifyToken;
