const authorize = (req, res, next) => {
    if (req.headers['token'] != undefined) {
        try {
            var result = jwt.verify(req.headers['token'], 'Kang');
            next();

        } catch (e) {
            return res.status(401).json({meg:"Token ไม่ถูกต้อง"}).end();
        }
    }
    else {
        console.log('failed token');
        return res.status(401).json({meg:"Token ไม่ถูกต้อง"}).end();
    }
}
module.exports = authorize;