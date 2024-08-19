import { Injectable } from '@angular/core';
import { Volunteer } from './volunteer.model';

@Injectable({
  providedIn: 'root'
})
export class VolunteerServiceService {

  public volunteerList = [
    {
      firstName:'rachel',
      lastName:'blackin',
      username:'rblackin',
      password:'',
      centerPref:'downtown',
      skills:'typing, time management, ',
      availability:['mondayMorning'],
      address:'3 pilgrim run',
      homeCell:'732-718-6195',
      workCell:'732-718-6195',
      email:'email@email.com',
      education:'bachelor',
      currentLicenses:'none',
      emergencyName:'serena',
      emergencyCell:'848-702-3445',
      emergencyEmail:'another@email.com',
      emergencyAddress:'42 ilgrim run',
      driversLicense:true,
      socialCard:true,
      status:true
    }
  ]

  getVolunteers():Volunteer[]{
    return this.volunteerList
  }

  getVolunteerByUsername(username:string):Volunteer | undefined{
    return this.volunteerList.find(v => v.username === username)
  }

  addVolunteer(newVolunteer: Volunteer){
    if (newVolunteer && newVolunteer.firstName && newVolunteer.lastName) {
      this.volunteerList.push(newVolunteer);
    } else {
      throw new Error('Invalid volunteer data');
    }
  }  

  editVolunteer(updatedVolunteer: Volunteer): boolean {
    let index = this.volunteerList.findIndex(volunteer => volunteer.username === updatedVolunteer.username);
  
    if (index !== -1) {
      // Loop over the keys of the updatedVolunteer object
      for (const key of Object.keys(updatedVolunteer) as (keyof Volunteer)[]) {
        const updatedValue = updatedVolunteer[key];
        // Only update if the value is not undefined or an empty string
        if (updatedValue !== undefined && updatedValue !== '') {
          // Explicitly cast the value to the type of the field being updated
          (this.volunteerList[index][key] as typeof updatedValue) = updatedValue
        }
      }
      return true;
    }
    return false;
  }  
  
  
}

