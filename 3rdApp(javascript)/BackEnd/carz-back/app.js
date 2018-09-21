const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var config= require('config');




const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// mongoose.connect("mongodb://user:user@carz-shard-00-00-sgsde.mongodb.net:27017,carz-shard-00-01-sgsde.mongodb.net:27017,carz-shard-00-02-sgsde.mongodb.net:27017/test?ssl=true&replicaSet=carz-shard-0&authSource=admin&retryWrites=true",
// { useNewUrlParser: true });

mongoose.connect(config.DBHost,{ useNewUrlParser:true});
let db =mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) =>{
    const error = new Error('Not Found');
error.status = 404;
next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;