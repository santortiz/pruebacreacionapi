const express = require('express');
const req = require('express/lib/request');
const bodyParser= require('body-parser');
const fileUpload = require('express-fileupload')
const Sequelize= require('sequelize');
const {sequelize, User} = require('./models');

const mysql = require('mysql2');
const res = require('express/lib/response');


const api = express();

api.use(express.static(__dirname + '/front'));
api.use(bodyParser.json());
api.use(fileUpload());


api.listen(5000, ()=>{
    console.log('api running!');
});


async function main(){
    await sequelize.sync({force:false})
    .catch(err => {
        console.log(err);
    });
};

main()


api.post('/add', async (req, res)=>{
    
    try{
        const user_row = await User.create({firstName: `${req.body.name}`, lastName: `${req.body.lastName}`});
        //return res.json(user_row)

    } catch (err){
        console.log(err);
    };
});

api.get('/registered', async (req,res)=>{

    try {
        const consult = await User.findAll()

        return res.json(consult);

    } catch(err){
        console.log(err);
    }

});

api.post('/del', async (req,res)=>{

    try{
        const del = await User.destroy({where: {
            firstName: `${req.body.firstName}`,
            lastName: `${req.body.lastName}`
        }});

    } catch (err){
        console.log(err)
    };
});


api.post('/upload', (req,res)=>{

    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            

            for (let file of req.files.archivo){
                
                file.mv('./uploads/' + file.name);
                
            };

            res.send({
                status: true,
                message: 'File is uploaded',
            });

        }
    } catch (err) {
        res.status(500).send(err);
    }
});