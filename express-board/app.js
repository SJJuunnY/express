require('dotenv').config(); //환경변수 설정(보안이슈)

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGO_URL_CLUSTER0+'/Movie',
).then(()=>console.log("Connected Successful")).catch(err=>console.log(err))

var app = express();

// view engine setup //views디렉 지워서 삭제
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.set(cors({origin:[
//     'http://127.0.0.1:3000',
//     'http://localhost:3000',
// ]}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const birdRouter = require("./routes/birds")
app.use('/birds', birdRouter)

app.get('/sample', (req,res)=>{
    console.log(req);   
    res.send("sample")
})

app.post('/sample',(req,res)=>{
    res.send("Create First POST")
})

let boardRouter = require("./routes/board")
app.use("/board", boardRouter);

let movieRouter = require("./routes/movie")
app.use("/movie",movieRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({err: err})
//   res.render('error');
});

module.exports = app;
