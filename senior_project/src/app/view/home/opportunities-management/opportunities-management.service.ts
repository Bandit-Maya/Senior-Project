import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { NewOppportunityData } from "./opportunity/opportunity.model";
import { Skill } from "./opportunity/opportunity.model";
import { Opportunity } from "./opportunity/opportunity.model";


 @Injectable({providedIn: 'root'})
 export class OpportunitiesManagementService{

    constructor(private http: HttpClient){};

    private opportunities: Opportunity[] =[]; 
    private opportunitiesUpdated = new Subject<Opportunity[]>(); 
    
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
        ).
        subscribe((filteredOpportunities)=>{
            this.opportunities = filteredOpportunities;
            this.opportunitiesUpdated.next([...this.opportunities])
        });
    }

    getOpportunityUpdateListener(){
        return this.opportunitiesUpdated.asObservable();
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

        const opportunity: Opportunity ={
            _id: opportunityId,
            title: opportunityData.title,
            location: opportunityData.location,
            date: opportunityData.date,
            reqSkills: reqSkills
            };

        this.http.post<{message: string, opportunityId: string}>('http://localhost:3000/api/opportunities', opportunity)
        .subscribe((responseData)=>{
            console.log(responseData.message);
            const id = responseData.opportunityId; 
            opportunity._id = id;
            this.opportunities.push(opportunity);
            this.opportunitiesUpdated.next([...this.opportunities]);
            console.log(opportunity._id)
        });
    }

    removeOpportunity(opportunityId: string){
        this.http.delete('http://localhost:3000/api/opportunities/' + opportunityId)
        .subscribe(()=>{
            const updatesOpportunitites = this.opportunities.filter(opportunity => opportunity._id !== opportunityId);
            this.opportunities = updatesOpportunitites;
            this.opportunitiesUpdated.next([...this.opportunities]);
            console.log("Opportunity ID: " + opportunityId + " Deleted.");
        });
    }

    editOpportunity(opportunityId: string, editedOpportunityData: NewOppportunityData){

        this.addOpportunity(editedOpportunityData);
        this.removeOpportunity(opportunityId);

        // let skills = [];
        // let reqSkills: Skill[] = [];
        // skills = editedOpportunityData.reqSkills.split(", ");
        // skills.forEach((skill, index) =>{
        //     reqSkills.push(
        //         {
        //             key: index,
        //             value: skill
        //         }
        //     )
        // }
        // )

        // let opportunityToEdit = this.opportunities.find(opportunity => opportunity._id === opportunityId);
        // if(opportunityToEdit){
        //     opportunityToEdit.title = editedOpportunityData.title;
        //     opportunityToEdit.location = editedOpportunityData.location;
        //     opportunityToEdit.date = editedOpportunityData.date;
        //     opportunityToEdit.reqSkills = reqSkills;
        //     this.addOpportunity(editedOpportunityData);
        //     this.removeOpportunity(opportunityId);
        // }
    }

    firstCall(){
        this.opportunitiesUpdated.next([...this.opportunities]);
    }

 }