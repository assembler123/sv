const { MongoClient } = require('mongodb');
const { MONGOURL, DBNAME } = process.env
const Conn = async() => {
    let conn = await MongoClient.connect(MONGOURL);
    let db = conn.db(DBNAME)
    return db
}
module.exports = Conn