module.exports = function (err, req, res, next) {
  if (err.code) {
    return res.json(err.code, err);
  }
  
  res.json(500, err);
};