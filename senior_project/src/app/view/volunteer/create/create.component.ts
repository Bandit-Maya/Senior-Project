import { Component } from '@angular/core';
import { Volunteer } from '../volunteer.model';
import { VolunteerServiceService } from '../volunteer-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  newVolunteer: Volunteer = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    centerPref: '',
    skills: '',
    availability: [],
    address: '',
    homeCell: '',
    workCell:'',
    email: '',
    education: '',
    currentLicenses: '',
    emergencyName: '',
    emergencyCell: '',
    emergencyEmail: '',
    emergencyAddress: '',
    driversLicense: false,
    socialCard: false,
    status: false
  };

  daysOfWeek = [
    { name: 'Monday Morning', value: 'mondayMorning', selected: false },
    { name: 'Monday Afternoon', value: 'mondayAfternoon', selected: false },
    { name: 'Monday Night', value: 'mondayNight', selected: false },
    { name: 'Tuesday Morning', value: 'tuesdayMorning', selected: false },
    { name: 'Tuesday Afternoon', value: 'tuesdayAfternoon', selected: false },
    { name: 'Tuesday Night', value: 'tuesdayNight', selected: false },
    { name: 'Wednesday Morning', value: 'wednesdayMorning', selected: false },
    { name: 'Wednesday Afternoon', value: 'wednesdayAfternoon', selected: false },
    { name: 'Wednesday Night', value: 'wednesdayNight', selected: false },
    { name: 'Thursday Morning', value: 'thursdayMorning', selected: false },
    { name: 'Thursday Afternoon', value: 'thursdayAfternoon', selected: false },
    { name: 'Thursday Night', value: 'thursdayNight', selected: false },
    { name: 'Friday Morning', value: 'fridayMorning', selected: false },
    { name: 'Friday Afternoon', value: 'fridayAfternoon', selected: false },
    { name: 'Friday Night', value: 'fridayNight', selected: false }
  ];
  constructor(private volunteerService: VolunteerServiceService,private router:Router) {}

isChecked(dayPart:string):boolean {
  return this.newVolunteer.availability.includes(dayPart)
}

onCheckboxChange() {
  this.newVolunteer.availability = this.daysOfWeek
      .filter(day => day.selected)
      .map(day => day.value);
 
}

onSubmit() 
{
  try{
    this.volunteerService.addVolunteer(this.newVolunteer)
    alert('Volunteer added')
    this.router.navigate(['/Volunteer'])
  }catch(error)
  {
    console.error('error adding',error);
    alert('Failed to add volunteer')
  }
  console.log(this.newVolunteer)
}

}
