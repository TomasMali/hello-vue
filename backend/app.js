// This file is for handling request
const express = require('express')
const app = express();
const cors = require("cors")

const bodyParser = require('body-parser')


const user = require('./api/routes/user')
const db = require('./api/routes/queries')




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// security
app.use(cors({ origin: "*" }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding")
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE')
    res.header('Accept', 'application/json');
    res.header('content-type', 'application/json');
    /*
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE')
        return res.status(200).json({})
    }
    */
    next()
})


// just go to the ather file if you pass me ...

app.use('/user', user)


//app.get('/tom', db.getUsers)
//app.get('/tom/:id', db.getUserById)
//app.post('/tom', db.createUser)

app.use('/tom', db)
app.use('/', db)


// if the user requires a path that doesnt exsists, i throw an error
app.use((req, ser, next) => {
    const error = new Error("Not found")
    error.status = 404
    next(error) // forword the request throut the appication
});

// i catch it here
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app;