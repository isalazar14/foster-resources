require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')


app.use(express.static(__dirname + '../client/dist/public'));
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

try {
    mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(console.log(`Connected to database: ${process.env.DB_NAME}`));
} catch (error) {
    console.log("Missing DB_NAME variable in .env file. Cannot connect to database.")
}

const routes = require('./routes/routes')
routes(app);

const port = process.env.SERVER_PORT || 8000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})