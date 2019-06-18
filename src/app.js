const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importing routes
const customerRoutes = require('./routes/customer');



//setings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));




//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'mydbinstance1.coq1tystebkx.us-east-1.rds.amazonaws.com',
    user: 'MasterUser',
    password: 'Hola123*',
    port: 3306,
    database: 'base'
}, 'single'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', customerRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//starting server
app.listen(app.get('port'), ()=> {
    console.log('Server on port 3000');
});