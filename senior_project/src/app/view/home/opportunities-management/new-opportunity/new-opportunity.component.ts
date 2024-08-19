import { Component,Output, EventEmitter,inject,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewOppportunityData } from '../opportunity/opportunity.model';
import { OpportunitiesManagementService } from '../opportunities-management.service';

@Component({
  selector: 'app-new-opportunity',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-opportunity.component.html',
  styleUrl: './new-opportunity.component.css'
})
export class NewOpportunityComponent {
  /*@Input({required: true}) userId!: string; */
  @Output() close = new EventEmitter();

  enteredTitle = '';
  enteredLocation = '';
  enteredDate = '';
  enteredReqSkills =  '';

  private opportunityService = inject(OpportunitiesManagementService)
  
  onCancel(){
    this.close.emit();
  }

  onSubmit(){
    this.opportunityService.addOpportunity({
      title: this.enteredTitle,
      location: this.enteredLocation,
      date: this.enteredDate,
      reqSkills: this.enteredReqSkills
    });
    this.close.emit();
  }
    
}
