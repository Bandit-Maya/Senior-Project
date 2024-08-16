const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    key: { type: Number},
    value: { type: String}
});

const opportunitySchema = mongoose.Schema({
    oppId: {String},
    title: {String},
    location: {String},
    date: {String},
    reqSkills: [skillSchema]

});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity; 
