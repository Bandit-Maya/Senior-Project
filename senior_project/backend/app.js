const express = require('express'); 
const app = express();
const bodyParser = require("body-parser");

const Opportunity = require('./models/opportunity');
const { default: mongoose } = require('mongoose');

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

let opportunities = [
    // {
    //     opportunityId: '1',
    //     title: 'Opp 1',
    //     location: 'Jacksonville',
    //     date: '01-1-2024',
    //     reqSkills: [{key: 1, value:'RNA'},{key: 2, value: 'Painting'}, {key: 3, value: 'testskill 1'},{key: 4, value: 'testskill 2'}]
    // },
    // {
    //     opportunityId: '2',
    //     title: 'Opp 2',
    //     location: 'Gainsville',
    //     date: '01-2-2024',
    //     reqSkills: [{key: 1, value: 'None'}]
    // },
    // {
    //     opportunityId: '3',
    //     title: 'Opp 3',
    //     location: 'Panama City',
    //     date: '01-3-2024',
    //     reqSkills: [{key: 1, value: 'Carpentry'}]
    // },
    // {
    //     opportunityId: '4',
    //     title: 'Opp 4',
    //     location: 'Oralando',
    //     date: '01-1-2024',
    //     reqSkills: [{key: 1, value: 'Painting'}]
    // }, 
    // {
    //     opportunityId: '5',
    //     title: 'Opp 5',
    //     location: 'Gainsville',
    //     date: '01-4-2024',
    //             reqSkills: [{key: 1, value: 'None'}]
    // },    
]

app.use(bodyParser.json());

app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Method",
        "GET, POST, PATCH, DELETE, OPTIONS"  
    );
    next();
});

//Allows you take new opportunities posted by the app. 
app.post("/api/opportunities", (req, res, next)=>{
    const opportunity = new Opportunity({
        oppId: req.body.opportunityId,
        title: req.body.title,
        location: req.body.location,
        date: req.body.date,
       reqSkills: req.body.reqSkills
    });


    opportunity.save().then(createdOpportunity =>{
        console.log(createdOpportunity.toObject());
    });
    res.status(201).json({
        message: 'Opportunity added'
    });
});

app.get('/api/opportunities',(req, res, next)=>{
    //This allows the mongoose model to find all instances of opportunity
    //on the data base that meets the requirements. 
    Opportunity.find()
    .then(documents =>{
        console.log(documents);
        res.json({
            message: 'Post was fetched succesfully!',
            opportunities: documents
        })
    });
})


module.exports = app;