

const bcrypt = require('bcrypt');
const express = require('express'); 
const app = express();
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const Opportunity = require('./models/opportunity');
const { default: mongoose } = require('mongoose');
const cors = require('cors');

app.use(cors());

let users = [];

//this is how you connect to the mongoDB with your admin creds. 
//the creds are Account: jophnpetefoster  and Password: rg2DUu9me8R6CDyr
//The data base is being saved in the mongoDB called .....................................|pre_assignment|
mongoose.connect('mongodb+srv://johnpetefoster:rg2DUu9me8R6CDyr@cluster0.bfdj5.mongodb.net/pre_assignment1?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('Connected to database!')
})
.catch(()=>{
    console.log('Connection failed!')
});

app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    next();
});

//Allows you take new opportunities posted by the app. 
app.post("/api/opportunities", (req, res, next)=>{
    const opportunity = new Opportunity({
        //oppId: req.body.opportunityId,
        title: req.body.title,
        location: req.body.location,
        date: req.body.date,
       reqSkills: req.body.reqSkills
    });

    opportunity.save().then(createdOpportunity =>{
        res.status(201).json({
            message: 'Opportunity added',
            opportunityId: createdOpportunity._id
        })
    });
});

app.get('/api/opportunities',(req, res, next)=>{
    //This allows the mongoose model to find all instances of opportunity
    //on the data base that meets the requirements. 
    Opportunity.find()
    .then(documents =>{
        res.json({
            message: 'Post was fetched succesfully!',
            opportunities: documents
        })
    });
})

app.delete("/api/opportunities/:id", (req, res, next) =>{
    Opportunity.deleteOne({_id: req.params.id}).then(result =>{
        console.log(result);
        res.status(200).json({message: "Opportunity deleted!"});
    })
});

app.post('/api/user/', (req, res, next)=>{
    const saltRounds = 10;
    if(req.body.username && req.body.password && !users.find(e => e.username == req.body.username)){
        bcrypt.genSalt(saltRounds, (err, salt)=>{
            bcrypt.hash(req.body.password, salt, (err, hash)=>{
                var newUser = {"username":req.body.username, "password":hash, "administrator":req.body.administrator};
                users.push(newUser);
                console.log(newUser);
                res.status(201).send({"username":req.body.username, "password":hash, "administrator":req.body.administrator});
            })
        })
    } else {
        res.status(400).send({status:400, message:'Username already in use'});
    }
})


app.post('/api/user/login/', (req, res, next) => {
    if(req.headers['authorization']){
        let userData = req.headers['authorization'].split(' ')[1];
        let decodedUserData = atob(userData);
        let userName = decodedUserData.split(':')[0];
        let password = decodedUserData.split(':')[1];
        let userFound = undefined;
        for(let i = 0; i < users.length; i++){
            if(users[i].username === userName)
            {
                userFound = users[i];
                break;
            }
        }
        if(userFound === undefined){
            res.status(401).send({message:"Invalid username or password"});
        } else {
            bcrypt.compare(password, userFound.password, (err,result)=>{
                if(result){
                    let token = jwt.sign({username:userFound.username, administrator:userFound.administrator}, 'PaisleyDaBes');
                    res.status(200).send({token:token});
                } else {
                    res.status(401).send({status:401, message:"Invalid username or password"});
                }
            })
        } 
    }else {
        res.status(401).send({status:401, message:"Invalid username or password"});

    }
})
module.exports = app;