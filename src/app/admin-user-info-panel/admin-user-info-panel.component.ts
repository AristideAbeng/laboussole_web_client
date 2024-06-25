import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-admin-user-info-panel',
  templateUrl: './admin-user-info-panel.component.html',
  styleUrls: ['./admin-user-info-panel.component.scss']
})
export class AdminUserInfoPanelComponent {

    showUserPersonalInfo:boolean = false;
    showUserActivity:boolean = false;

    @Input() selectedUser:any;
    
    constructor(){
      this.changePanel(1);
    }

    changePanel(n:number){
      if(n==2){
        this.showUserActivity = true;
        this.showUserPersonalInfo = false;
      }else if(n==1){
        this.showUserActivity = false;
        this.showUserPersonalInfo = true;
      }
    }
}
