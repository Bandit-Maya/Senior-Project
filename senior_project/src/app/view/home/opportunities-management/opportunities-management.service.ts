import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

import { NewOppportunityData } from "./opportunity/opportunity.model";
import { Skill } from "./opportunity/opportunity.model";
import { Opportunity } from "./opportunity/opportunity.model";


 @Injectable({providedIn: 'root'})
 export class OpportunitiesManagementService{
    private nextOpportunityIdNum = 6;
    private freedOppotunityIdNums: string[] =[''];

    constructor(private http: HttpClient){};

    private opportunities: Opportunity[] =[]; 
    
    getOpportunities(search: string, filter: string){
        search = search.toLowerCase();
    
        return this.http.get<{message: string, opportunities: Opportunity[]}>('http://localhost:3000/api/opportunities')
        .pipe(
            map((opportunitiesData: { message: string; opportunities: Opportunity[] }) => {
                this.opportunities = opportunitiesData.opportunities;
                return this.opportunities.filter((opportunity) => {
                    let searchMatch =
                        opportunity.title.toLowerCase().includes(search) ||
                        opportunity.location.toLowerCase().includes(search) ||
                        opportunity.date.toLowerCase().includes(search) ||
                        this.checkSkills(opportunity.reqSkills, search);
    
                    if (filter == 'All') {
                        return searchMatch;
                    }
                    if (filter == '60') {
                        let opportunityDate = new Date(opportunity.date);
                        let toDate = new Date();
                        toDate.setDate(toDate.getDate() + 60);
                        let dateMatch = opportunityDate <= toDate;
                        return searchMatch && dateMatch;
                    }
    
                    let filterMatch = filter ? opportunity.location === filter : true;
                    return searchMatch && filterMatch;
                });
            })
        );
    }

    checkSkills(skills: Skill[], search: string){
      let match = false;
      skills.forEach((skill: Skill)=>{
        if(skill.value.toLowerCase().includes(search)){
            match = true;
        }
      })
      return match;
    }

    getLocationList(){
        let locationList: string[] = [];

        this.opportunities.forEach((opportunity: Opportunity)=>{
            if(!locationList.includes(opportunity.location)){
                locationList.push(opportunity.location);
            }
        })
        return locationList;
    }

    addOpportunity(opportunityData: NewOppportunityData){
        let opportunityId = '';
        let skills = [];
        let reqSkills: Skill[] = [];

        if(this.freedOppotunityIdNums.length === 1){
            opportunityId = this.nextOpportunityIdNum.toString();
            this.nextOpportunityIdNum += 1;
        }

        if(this.freedOppotunityIdNums.length > 1){
            let temp = this.freedOppotunityIdNums.pop();
            if(typeof(temp)==='string'){
                opportunityId = temp;
            }
        }

        skills = opportunityData.reqSkills.split(", ");
        skills.forEach((skill, index) =>{
            reqSkills.push(
                {
                    key: index,
                    value: skill
                }
            )
        }
        )
        this.opportunities.unshift({
            opportunityId: opportunityId,
            title: opportunityData.title,
            location: opportunityData.location,
            date: opportunityData.date,
            reqSkills: reqSkills

        })
    }

    removeOpportunity(opportunityId: string){
        this.opportunities = this.opportunities.filter((opportunity)=> opportunity.opportunityId !== opportunityId);
        this.freedOppotunityIdNums.push(opportunityId)
    }

    editOpportunity(opportunityId: string, editedOpportunityData: NewOppportunityData){
        let skills = [];
        let reqSkills: Skill[] = [];
        skills = editedOpportunityData.reqSkills.split(", ");
        skills.forEach((skill, index) =>{
            reqSkills.push(
                {
                    key: index,
                    value: skill
                }
            )
        }
        )

        let opportunityToEdit = this.opportunities.find(opportunity => opportunity.opportunityId === opportunityId);
        if(opportunityToEdit){
            opportunityToEdit.title = editedOpportunityData.title;
            opportunityToEdit.location = editedOpportunityData.location;
            opportunityToEdit.date = editedOpportunityData.date;
            opportunityToEdit.reqSkills = reqSkills;
            
        }
    }

 }