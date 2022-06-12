const resError = (res, errorCode, errorMessage) => {
  res.set('Content-Type', 'application/json');

  var responseData = JSON.stringify({
    "ok": false,
    "code": errorCode,
    "message": errorMessage
  });
  res.set('Access-Control-Allow-Origin', '*');
  res.send(responseData);
  return true;
};

module.exports = resError;