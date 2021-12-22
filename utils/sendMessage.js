const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = async(phone, message) => {

    let msg = await client.messages.create({
        body: message,
        from: '+12542795321',
        to: phone
    });
    return msg.sid;

}