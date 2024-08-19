import { Component, OnInit } from '@angular/core';
import { VolunteerServiceService } from '../volunteer-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Volunteer } from '../volunteer.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  volunteer!:Volunteer;
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
  enteredfirst = '';
  enteredlast = '';
  enteredUsername = '';
  enteredPassword = '';
  enteredCenter = '';
  enteredSkills = '';
  enteredAvailability: string[] = [];
  enteredAddress = '';
  enteredHomeCell = '';
  enteredWorkCell = '';
  enteredEmail = '';
  enteredEducation = '';
  enteredLicenses = '';
  enteredEmerName  = '';
  enteredEmerCell = '';
  enteredEmerEmail = '';
  enteredEmerAddr = '';
  enteredDrivers = false;
  enteredSocial = false;
  enteredStatus = false;

  constructor(private volunteerService: VolunteerServiceService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {

  const foundUsername = this.route.snapshot.paramMap.get('username');

  if(foundUsername){
    const foundVolunteer = this.volunteerService.getVolunteerByUsername(foundUsername);
    if(foundVolunteer)
    {
      this.volunteer = foundVolunteer
      this.enteredfirst = this.volunteer.firstName;
      this.enteredlast = this.volunteer.lastName;
      this.enteredUsername = this.volunteer.username;
      this.enteredPassword = this.volunteer.password;
      this.enteredCenter = this.volunteer.centerPref;
      this.enteredSkills = this.volunteer.skills;
      this.enteredAvailability = this.volunteer.availability; 
      this.enteredAddress = this.volunteer.address;
      this.enteredHomeCell = this.volunteer.homeCell;
      this.enteredWorkCell = this.volunteer.workCell;
      this.enteredEmail = this.volunteer.email;
      this.enteredEducation = this.volunteer.education;
      this.enteredLicenses = this.volunteer.currentLicenses;
      this.enteredEmerName = this.volunteer.emergencyName;
      this.enteredEmerCell = this.volunteer.emergencyCell;
      this.enteredEmerEmail = this.volunteer.emergencyEmail;
      this.enteredEmerAddr = this.volunteer.emergencyAddress;
      this.enteredDrivers = this.volunteer.driversLicense;
      this.enteredSocial = this.volunteer.socialCard;
      this.enteredStatus = this.volunteer.status;

      this.updateDaysOfWeekSelection();
    }else{
      alert('volunteer not found')
      this.router.navigate(['/Volunteer'])
    }
    
  }
  }

  updateDaysOfWeekSelection(){
    this.daysOfWeek.forEach(day =>{
      day.selected = this.enteredAvailability.includes(day.value);
    })
  }

  onSubmit(): void {
    const updatedVolunteer: Volunteer = {
      firstName: this.enteredfirst,
      lastName: this.enteredlast,
      username: this.enteredUsername,
      password: this.enteredPassword,
      centerPref: this.enteredCenter,
      skills: this.enteredSkills,
      availability: this.enteredAvailability,
      address: this.enteredAddress,
      homeCell: this.enteredHomeCell,
      workCell: this.enteredWorkCell,
      email: this.enteredEmail,
      education: this.enteredEducation,
      currentLicenses: this.enteredLicenses,
      emergencyName: this.enteredEmerName,
      emergencyCell: this.enteredEmerCell,
      emergencyEmail: this.enteredEmerEmail,
      emergencyAddress: this.enteredEmerAddr,
      driversLicense: this.enteredDrivers,
      socialCard: this.enteredSocial,
      status: this.enteredStatus
    };
    console.log(updatedVolunteer)
    const success = this.volunteerService.editVolunteer(updatedVolunteer);
    console.log(success)
    if (success) {
      alert('Volunteer edited');
      this.router.navigate(['/Volunteer']);
    } else {
      alert('Couldn\'t edit');
    }
  }

  onCheckboxChange(value: string): void {
    if (this.enteredAvailability.includes(value)) {
      this.enteredAvailability = this.enteredAvailability.filter(item => item !== value);
    } else {
      this.enteredAvailability.push(value);
    }
  }
}
