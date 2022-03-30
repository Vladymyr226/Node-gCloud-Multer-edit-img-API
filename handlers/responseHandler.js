const resData = (res, data) => {
    res.set('Content-Type', 'application/json');
    const responseData = JSON.stringify({
        "ok": true,
        "data": data
    });
    res.set('Access-Control-Allow-Origin', '*')
    res.send(responseData);
    return true;
};

module.exports = resData;