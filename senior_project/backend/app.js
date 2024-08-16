const express = require('express'); 
const app = express();

app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-with",
        "Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Method",
        "GET, POST, PATCH, DELETE, OPTIONS"  
    );
    next();
});

app.post("/api/opportunities", (req, res, next)=>{
    console.log();
});

app.use('/api/opportunities',(req, res, next)=>{
    const opportunities = [
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
   res.json({
    message: 'Post was fetched succesfully!',
    opportunities: opportunities
   })
})


module.exports = app;