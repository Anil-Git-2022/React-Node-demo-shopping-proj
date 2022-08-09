const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const https = require('https')
const productRoutes = require('./routes/product');
const LoginRoutes = require('./routes/login');
const CartRoutes = require('./routes/cart')
const OrderRoutes = require('./routes/order')
const axios = require('axios');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/product',productRoutes);
app.use('/cart',CartRoutes);
app.use('/order',OrderRoutes);
app.use(LoginRoutes);
//app.use('/auth', authRoutes);

app.get('/register', function(req, res) {
  let url = `https://localhost:8080/register`;

  axios({
      method:'post',
      url
  })
  .then(function (response) {
      res.send(JSON.stringify(response.data));
  })
  .catch(function (error) {
      console.log(error);
  });
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb://localhost:27017/shop?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
  )
  .then(result => {
    const server = app.listen(8080);
    // const io = require('./socket').init(server);
    // io.on('connection', socket => {
    //   console.log('Client connected');
    // });

    // let url = "http://localhost:8080/register"
    //   let fetchData = {
    //     method: 'POST',
    //     // headers: new Headers({
    //     //   'Accept': 'application/json',
    //     //   'Content-Type': 'multipart/form-data'
    //     // })
    // }

  //   var postData = JSON.stringify({
  //     'msg' : 'Hello World!'
  // });
  
  // var options = {
  //   hostname: 'http://localhost:8080/register',
  //   port: 443,
  //   path: '/register',
  //   method: 'POST',
  //   headers: {
  //        'Content-Type': 'application/x-www-form-urlencoded',
  //        'Content-Length': postData.length
  //      }
  // };
  
  // var req = https.request(options, (res) => {
  //   console.log('statusCode:', res.statusCode);
  //   console.log('headers:', res.headers);
  
  //   res.on('data', (d) => {
  //     process.stdout.write(d);
  //   });
  // });
  
  // req.on('error', (e) => {
  //   console.error(e);
  // });
  
  // req.write(postData);
  // req.end();
     
  })