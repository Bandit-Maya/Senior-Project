import { Component, Input, Output,EventEmitter, inject} from '@angular/core';
import { Opportunity } from './opportunity.model';
import { Volunteer } from '../../../volunteer/volunteer.model';
import { OpportunitiesManagementService } from '../opportunities-management.service';
import { EditOpportunityComponent } from '../edit-opportunity/edit-opportunity.component';
import { VolunteerServiceService } from '../../../volunteer/volunteer-service.service';

//import { EventEmitter } from 'stream';

@Component({
  selector: 'app-opportunity',
  standalone: true,
  imports: [EditOpportunityComponent],
  templateUrl: './opportunity.component.html',
  styleUrl: './opportunity.component.css'
})
export class OpportunityComponent {
  @Input ({required: true}) opportunity!: Opportunity;
  @Output() removeId = new EventEmitter(); 

  //private OpportunitiesManagementService = inject(OpportunitiesManagementService)
  private volunteerServiceService = inject(VolunteerServiceService);
  isEditingOpportunity = false;

  volunteers: Volunteer [] =[];
  matchedVolunteers: Volunteer [] = [];

  ngOnInit(){
    this.volunteers = this.volunteerServiceService.getVolunteers(); 
    
    this.opportunity.reqSkills.forEach(skill => {
      this.matchedVolunteers = this.volunteers.filter((volunteer)=>{
        let match = volunteer.skills.toLowerCase().includes(skill.value.toLowerCase());
        return match;
      })
    } );
  }

  onRemoveOpportunity(){
    this.removeId.emit(this.opportunity._id);
    //this.OpportunitiesManagementService.removeOpportunity(this.opportunity.opportunityId);
  }

  onEditOpportunity(){
    this.isEditingOpportunity = true;
  }
  onCloseEditOpportunity(){
    this.isEditingOpportunity =false;
  }
}
