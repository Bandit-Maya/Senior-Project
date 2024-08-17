import { Component } from '@angular/core';
import { VolunteerServiceService } from '../volunteer-service.service';
import { Router } from '@angular/router';
import { Volunteer } from '../volunteer.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  constructor(private volunteerService:VolunteerServiceService, private router:Router){}

  volunteer: Partial<Volunteer> = {};

  onSubmit() {
    let result = this.volunteerService.editVolunteer(this.volunteer as Volunteer);

    if(result){
      alert('Volunteer updated');
      this.router.navigate(['/volunteers']);

    }else{
      alert('Volunteer not found');
    }
  }
}
