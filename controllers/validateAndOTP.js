const dbconn = require('../conn');
const sendMessage = require('../utils/sendMessage');
var dbc;
(async() => {
    dbc = await dbconn();
})()
const checkDB = async(phoneNumber, countryCode) => {
    let rs = []
    try {
        rs = await dbc.collection("phone").find({ countryCode: countryCode, phoneNumber: phoneNumber }).toArray();
        console.log("Result-->>", rs)
    } catch (e) {
        console.log(e);
    }
    return rs.length
}
const valid = async(req, res) => {
    let { phoneNumber, countryCode } = req.body;
    if (phoneNumber.length != 10) {
        res.status(400).json({
            message: "Please enter 10 digits phone number"
        })
    } else if (countryCode != "+91") {
        res.status(400).json({
            message: "We don't serve this region"
        })
    } else {
        if (await checkDB(phoneNumber, countryCode)) {
            res.status(400).json({
                message: "Already registered! Please login"
            })
        } else {
            let otp = (Math.floor(100000 + Math.random() * 900000));
            await sendMessage(countryCode + phoneNumber, `Your One Time Password is ${otp}. Please Do not share with anyone`)
            await dbc.collection("phone").insertOne({
                _id: countryCode + phoneNumber,
                phoneNumber,
                countryCode,
                otp,
                updated: new Date()
            })
            res.status(200).json({
                message: "Done"
            })

        }
    }
}

module.exports = valid;