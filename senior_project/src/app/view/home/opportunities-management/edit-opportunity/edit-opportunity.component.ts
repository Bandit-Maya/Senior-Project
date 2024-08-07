import { Component,Output, EventEmitter,inject,Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Opportunity, Skill } from '../opportunity/opportunity.model';
import { NewOppportunityData } from '../opportunity/opportunity.model';
import { OpportunitiesManagementService } from '../opportunities-management.service';

@Component({
  selector: 'app-edit-opportunity',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-opportunity.component.html',
  styleUrl: './edit-opportunity.component.css'
})
export class EditOpportunityComponent {
  @Input({required: true}) opportuntity!: Opportunity;
  @Output() close = new EventEmitter();

  private taskService = inject(OpportunitiesManagementService)

  enteredTitle = '';
  enteredLocation = '';
  enteredDate = '';
  enteredReqSkills = '';

  ngOnInit():void{
    this.enteredTitle = this.opportuntity.title;
    this.enteredLocation = this.opportuntity.location;
    this.enteredDate =  this.opportuntity.date;
    this.enteredReqSkills =  this.getSkillString(this.opportuntity.reqSkills)
  }

  onCancel(){
    this.close.emit();
  }

  onSubmit(){
    this.taskService.editOpportunity( this.opportuntity.opportunityId,{
      title: this.enteredTitle,
      location: this.enteredLocation,
      date: this.enteredDate.toString(),
      reqSkills: this.enteredReqSkills
    });
    this.close.emit();
  }

  getSkillString(skills: Skill[]){
   
    return skills.map(skill => skill.value).join(', ');
  }
}
