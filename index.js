const app = require('express')();
require('dotenv').config()
const { PORT } = process.env
bodyParser = require('body-parser');
app.use(bodyParser.json());
const Routes = require('./routes')
Routes(app)
app.listen(PORT, () => { console.log(`App is listening on ${PORT}`) })