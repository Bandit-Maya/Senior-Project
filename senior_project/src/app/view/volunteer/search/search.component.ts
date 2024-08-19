import { Component } from '@angular/core';
import { Volunteer } from '../volunteer.model';
import { VolunteerServiceService } from '../volunteer-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchInfo = '';

  searchResult:Volunteer[] = [];
  noResult = false;

  constructor(private volunteerService:VolunteerServiceService){}

  onSearch(){
    this.searchResult = this.volunteerService.getVolunteers().filter(volunteer =>
      volunteer.firstName.toLowerCase().includes(this.searchInfo.toLowerCase()) ||
      volunteer.lastName.toLowerCase().includes(this.searchInfo.toLowerCase()) ||
      volunteer.username.toLowerCase().includes(this.searchInfo.toLowerCase())
    );
    this.noResult = this.searchResult.length === 0;
  }
}
