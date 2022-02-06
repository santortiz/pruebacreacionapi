const express = require('express');
const req = require('express/lib/request');
const bodyParser= require('body-parser');

const mysql = require('mysql2');
const res = require('express/lib/response');
/*
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
*/

const api = express();

api.use(express.static(__dirname + '/front'));
api.use(bodyParser.json());


api.listen(3000, ()=>{
    console.log('api running!');
});

/*
api.post('/add', (req, res)=>{
    
    connection.query('INSERT INTO user (firstName, lastName) VALUES (?)',[[req.body.name, req.body.lastName]],  (error, results)=>{
        if (error) return res.json({error: error});
    });

    res.send('item added');
    
});

api.get('/registered', (req, res) => {
    connection.query('SELECT * FROM user', (error, results)=>{

        if (error) return res.json({error: error});
        res.json(results); 
    });
});

api.post('/del', (req, res)=>{

    connection.query(`DELETE FROM user WHERE firstName='${req.body.firstName}' AND lastName='${req.body.lastName}'`, (error, results)=>{
        if (error) return res.json({error: error});
    });
});
*/

//QUERIES CON SEQUELIZE-CLI

const Sequelize= require('sequelize');
const {sequelize, user} = require('./models');


async function main(){
    await sequelize.sync({force:false})
    .catch(err => {
        console.log(err);
    });
};

main()


api.post('/add', async (req, res)=>{
    
    try{
        const user_row = await user.create({firstName: `${req.body.name}`, lastName: `${req.body.lastName}`});
        //return res.json(user_row)

    } catch (err){
        console.log(err);
    };
});

api.get('/registered', async (req,res)=>{

    try {
        const consult = await user.findAll()

        return res.json(consult);

    } catch(err){
        console.log(err);
    }

});

api.post('/del', async (req,res)=>{

    try{
        const del = await user.destroy({where: {
            firstName: `${req.body.firstName}`,
            lastName: `${req.body.lastName}`
        }});

    } catch (err){
        console.log(err)
    };
});