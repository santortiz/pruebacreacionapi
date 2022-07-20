const express = require('express');
const req = require('express/lib/request');
const bodyParser= require('body-parser');

const mysql = require('mysql2');
const res = require('express/lib/response');

const connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'user',
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
api.use(bodyParser.json());


api.listen(3000, ()=>{
    console.log('api running!');
});


api.post('/add', (req, res)=>{
    
    connection.query('INSERT INTO users (firstName, lastName) VALUES (?)',[[req.body.name, req.body.lastName]],  (error, results)=>{
        if (error) return res.json({error: error});
    });

    res.send('item added');
    
});

api.get('/registered', (req, res) => {
    connection.query('SELECT * FROM users', (error, results)=>{

        if (error) return res.json({error: error});
        res.json(results); 
    });
});

api.post('/del', (req, res)=>{

    connection.query(`DELETE FROM user WHERE firstName='${req.body.firstName}' AND lastName='${req.body.lastName}'`, (error, results)=>{
        if (error) return res.json({error: error});
    });
});