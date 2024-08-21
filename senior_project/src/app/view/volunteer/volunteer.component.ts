import { Component } from '@angular/core';
import { Volunteer } from './volunteer.model';
import { VolunteerServiceService } from './volunteer-service.service';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrl: './volunteer.component.css'
})
export class VolunteerComponent {
  volunteers:Volunteer[] = [];
  displayedColumns:string[]=['firstName','lastName','username','centerPref','skills','availability','address','homeCell','workCell','education','currentLicenses','emergencyName','emergencyCell','emergencyEmail','emergencyAddress','driversLicense','socialCard','status']
  constructor(private volunteerService:VolunteerServiceService) {}
  async FilterVols(filterArg:string){
    if(filterArg === 'Approved'){
      this.volunteers = this.volunteerService.getVolunteers();
      this.volunteers = this.volunteers.filter(e => e.status === true);
    } else if(filterArg === 'Disapproved'){
      this.volunteers = this.volunteerService.getVolunteers();
      this.volunteers = this.volunteers.filter(e => e.status === false);
    } else if (filterArg === 'All'){
      this.volunteers = this.volunteerService.getVolunteers();
    }
  }

  ngOnInit(){
    this.volunteers = this.volunteerService.getVolunteers();
  }
  
}
