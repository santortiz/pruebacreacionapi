const express = require('express');
const req = require('express/lib/request');

const mysql = require('mysql2');

const connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'prueba'
});

try{
    connection.connect();
} catch (e){
    console.log('connection to mysql failed');
    console.log(e);
}

const api = express();

api.use(express.static(__dirname + '/front'));

api.listen(3000, ()=>{
    console.log('api running!');
});

api.post('/add', (req,res) => {
    res.send('request received');
    console.log('request received');
});