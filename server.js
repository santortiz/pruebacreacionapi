const express = require('express');
const req = require('express/lib/request');
const bodyParser= require('body-parser');

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
api.use(bodyParser.json());


api.listen(3000, ()=>{
    console.log('api running!');
});


api.post('/add', (req, res)=>{
    
    res.send('item added');
    connection.query('INSERT INTO user (firstName, lastName) VALUES (?)',[[req.body.name, req.body.lastName]],  (error, results)=>{
        if (error) return res.json({error: error});
    });
    
});

api.get('/registered', (req, res) => {
    connection.query('SELECT * FROM user', (error, results)=>{

        if (error) return res.json({error: error});
        res.json(results); 
    });
});

api.get('/length', (req, res)=>{
    connection.query('SHOW COLUMNS FROM user', (error, results)=>{
        let columns_= [];

        for (let item of results){
            columns_.push(item.Field);
        }

        
        let columns= JSON.stringify(columns_);

        
        res.json(columns);
    });
});

