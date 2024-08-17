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

module.exports = app;