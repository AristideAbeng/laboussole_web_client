import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expert-profile-view',
  templateUrl: './expert-profile-view.component.html',
  styleUrls: ['./expert-profile-view.component.scss']
})
export class ExpertProfileViewComponent {
@Input() details:any;
@Output() backToList = new EventEmitter<any>;

constructor(private router:Router){
  
}

ngOnInit(){
  //console.log(this.details.expert_id)
}

goToChatExpert(){
  console.log(this.details.expert_id);
  this.router.navigateByUrl("chat-expert/"+this.details.expert_id)
}

backToExpertList(){
  this.backToList.emit("true")
}
}
