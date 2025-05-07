const apiResponse = (res, type = true, statusCode, message, data = {}) => {
    res.status(statusCode).json({ success:type,message,data});
  };

module.exports = apiResponse;
  