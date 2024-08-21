import { Component } from '@angular/core';
import { Volunteer } from './volunteer.model';
import { VolunteerServiceService } from './volunteer-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrl: './volunteer.component.css'
})
export class VolunteerComponent {
  volunteers:Volunteer[] = [];
  displayedColumns:string[]=['firstName','lastName','username','centerPref','skills','availability','address','homeCell','workCell','education','currentLicenses','emergencyName','emergencyCell','emergencyEmail','emergencyAddress','driversLicense','socialCard','status']
  constructor(private volunteerService:VolunteerServiceService) {}

  ngOnInit(){
    this.refreshVolunteers();
  }

  refreshVolunteers(){
    this.volunteers = this.volunteerService.getVolunteers();
  }
  
}
