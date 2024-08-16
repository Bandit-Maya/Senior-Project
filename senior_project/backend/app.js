const express = require('express'); 
const app = express();
const bodyParser = require("body-parser");

let opportunities = [
    {
        opportunityId: '1',
        title: 'Opp 1',
        location: 'Jacksonville',
        date: '01-1-2024',
        reqSkills: [{key: 1, value:'RNA'},{key: 2, value: 'Painting'}, {key: 3, value: 'testskill 1'},{key: 4, value: 'testskill 2'}]
    },
    {
        opportunityId: '2',
        title: 'Opp 2',
        location: 'Gainsville',
        date: '01-2-2024',
        reqSkills: [{key: 1, value: 'None'}]
    },
    {
        opportunityId: '3',
        title: 'Opp 3',
        location: 'Panama City',
        date: '01-3-2024',
        reqSkills: [{key: 1, value: 'Carpentry'}]
    },
    {
        opportunityId: '4',
        title: 'Opp 4',
        location: 'Oralando',
        date: '01-1-2024',
        reqSkills: [{key: 1, value: 'Painting'}]
    }, 
    {
        opportunityId: '5',
        title: 'Opp 5',
        location: 'Gainsville',
        date: '01-4-2024',
                reqSkills: [{key: 1, value: 'None'}]
    },    
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
    const opportunity = req.body;
    opportunities.unshift(opportunity);
    //console.log(opoprtunity);
    res.status(201).json({
        message: 'Opportunity added'
    });
});

app.get('/api/opportunities',(req, res, next)=>{

   res.json({
    message: 'Post was fetched succesfully!',
    opportunities: opportunities
   })
})


module.exports = app;