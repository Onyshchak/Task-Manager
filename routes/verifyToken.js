const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

  const token = req.header('Authorization');
  if(!token || token === 'null') return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (e) {
    res.status(400).send('Invalid token');
  }
};
