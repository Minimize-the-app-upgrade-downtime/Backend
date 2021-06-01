const express = require('express');
var cookieParser = require("cookie-parser");
const mysql = require('mysql');
const path = require('path');
const app = express();

var office = require('./routes/office')
const port = 9000;
const employee = require('./routes/employee');

// const db = mysql.createConnection({
//     host: 'jhdjjtqo9w5bzq2t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//     user: 'u8il24jxufb4n4ty',
//     password: 't5z5jvsyolrqhn9k',
//     database: 'm0ky8hn32ov17miq'

// });


const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'passme',
        database: 'epfdetails'
    
});

//create database connection
db.connect((err)=>{
    if(err){
        //throw err;
        console.log(err);
    }
    console.log('connected to database');
});

global.db = db;

app.listen(port,()=>{
    console.log(`Sever runing on port: ${port}`);
});


// configure middleware
app.set('port', process.env.port || port); // set express to use this port

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json()); // parse form data client


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

app.get('/',(req,res)=>{
    res.render('pages/home')
});

//view office
app.get('/viewoffice',office);

//load office add form
app.get('/addoffice',office);

// office add form data
app.post('/addFormOffice',office);

//view employee
app.get('/viewemployee',employee);

// load employee page
app.get('/addemployee',employee);

// employee add form data
app.post('/addFormEmployee',employee);



//delete eployee
app.get('/deleteemployee/:id',employee);

// load employee page
app.get('/updateemployee/:id',employee);

//update employee 
app.post('/updateFormEmployee',employee);

module.exports = app;

