const validateAndOTP = require("../controllers/validateAndOTP")
module.exports = (app) => {
    app.get('/user/init', (req, res, next) => {
        console.log(req.body)
        validateAndOTP(req, res);
        // res.send("USER REGISTEREDD")
    })
    app.post('/user/verify', (req, res, next) => {

    })
}