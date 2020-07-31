const express = require('express');
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const { response } = require('express');
app.use(express.json());
app.use(cors());

const register = require('./Controller/register')
const signin = require('./Controller/signin')
const profile = require('./Controller/profile')
const image = require('./Controller/image')

const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '6998',
        database: 'smart-brain'
    }
});

// console.log(db.select('*').from('users'))
// db.select('*').from('users').then(data => {
//     console.log(data)
// }
// )
// app.listen is the number of the server
// exampel 12389 => http://localhost:12389/
//This is not realistic in heroku
// app.listen(3000, () => {
//     console.log("app is running on port 3000");
// });
// console.log(process.env)

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port${process.env.PORT}`);
});
// console.log(process.env)
app.get("/", (req, res) => {
    // res.send(database.users);
    res.send('It is WORKING');

});

app.post("/signin", (req, res) => {
    signin.handleSignIn(req, res, db, bcrypt)

});

app.post("/register", (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
});

app.get("/profile/:id", (req, res) => {
    profile.handleProfile(req, res, db)
});

app.put("/image", (req, res) => {
    image.handleImage(req, res, db)
})
app.post("/imageURL", (req, res) => {
    image.handleAPICall(req, res)
})