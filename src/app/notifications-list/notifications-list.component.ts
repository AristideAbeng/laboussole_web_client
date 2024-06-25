import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from '../Models/notification';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent {
  allNotifications:Array<Notification> = new Array()

  constructor(private notificationService:NotificationsService,private router:Router){

  }

  ngOnInit(){
    this.fetchAllNotifications();
  }

  fetchAllNotifications(){
    this.notificationService.getAllNotifications().subscribe(
      (data:any)=>{
       // console.log(data);
        this.allNotifications = data as Array<Notification>
        this.allNotifications.reverse();

      }
    );
  }

  

  viewNotification(id:number){
    this.notificationService.setCurrentNotification(id)
    this.router.navigateByUrl("/details-notifications")
    // Set data in localStorage
    const value = localStorage.getItem('notification'+id);
    if(value){
      
    }else{
      this.notificationService.reduceUnReadNotifications(id);
      localStorage.setItem('notification'+id,'1');
    }
    

  }
}
