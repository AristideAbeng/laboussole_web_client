import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-objectif-box',
  templateUrl: './objectif-box.component.html',
  styleUrls: ['./objectif-box.component.scss']
})
export class ObjectifBoxComponent {
  @Output() showPlan = new EventEmitter<any>();
  @Output() showSpecificPlan = new EventEmitter<any>();
  @Input() job_title:string = "";
  @Input() job_description:string = "";
  @Input() has_plan:boolean = false;
  @Input() action_plans:any[] = []

  has_many_plans:boolean = false;
  action_plan_with_names = new Map<string,any>();

  constructor(private userService:UserServiceService,private router:Router){
    
  }
  ngAfterViewInit(){
    if(this.action_plans.length>1){
      console.log(this.action_plans)
      for(let plan of this.action_plans){
        this.userService.getUserNameById(plan.expert).subscribe(
          (data:any)=>{
            //console.log('-------------Logging from data')
            console.log(data);
            this.action_plan_with_names.set(String(data.username)+", created on:"+this.formatTimestampToDateTime(plan.created_at),plan)
          },
          (error)=>{
            console.error(error)
          }
        )
      }
     
      this.has_many_plans=true;
    }
  }

  notifyToShowPlan(){
    this.showPlan.emit("")
  }
  notifyToShowSpecificPlan(item:string){
    console.log('---plan to send-------------')
    console.log(this.action_plan_with_names.get(item))
    this.showSpecificPlan.emit(this.action_plan_with_names.get(item))
  }

   // Getter to convert Map to Array
   get actionPlanEntries() {
    console.log('--------logging from val')
    let val = Array.from(this.action_plan_with_names.entries());
    console.log(val)
    return val;
  }

  goToConsulterExpert(){
    this.router.navigateByUrl('consulter-expert')
  }
  formatTimestampToDateTime(timestamp: { seconds: number; nanoseconds: number }): string {
    // Create a Date object using the seconds
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
  
    // Get day, month, year, hours, and minutes
    const day = String(date.getDate()).padStart(2, '0'); // Day of the month
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month (zero-indexed, so add 1)
    const year = date.getFullYear(); // Full year
    const hours = String(date.getHours()).padStart(2, '0'); // Get hours and pad with zero if needed
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad with zero if needed
  
    // Format as dd/mm/yyyy h:m
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
}
