const express = require('express');
const app = express();
require('dotenv').config();
const passport = require('passport');
const socket = require('socket.io');
const expressSession = require('express-session');
const http = require('http');
const db = require('./config/mongoose-connection');

const server = http.createServer(app);
const io = server();


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname ,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/',function(req,res){
    res.send('chal rha h bhai')
});

server.listen(process.env.PORT);
