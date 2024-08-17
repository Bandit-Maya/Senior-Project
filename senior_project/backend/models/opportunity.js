const mongoose = require('mongoose');

const opportunitySchema = mongoose.Schema({
    //oppId: {type: String, required: true},
    title: {type: String, required: true},
    location: {type: String, required: true},
    date: {type: String, required: true},
    reqSkills: [
        {
            key: { type: Number },  
            value: { type: String }
        }
    ]

});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity; 
