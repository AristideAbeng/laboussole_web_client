import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { NotificationsService } from '../services/notifications.service';
import { Notification } from '../Models/notification';

@Component({
  selector: 'app-logged-in-nav-header',
  templateUrl: './logged-in-nav-header.component.html',
  styleUrls: ['./logged-in-nav-header.component.scss']
})
export class LoggedInNavHeaderComponent {

  @Output() menuIconClosed = new EventEmitter<void>();

  showSearchBar = false;

  hideMenuIcon = false;

  showDropdown = false;

  username:string="";

  query:string="";

  unread_notif_count:string='';
  val:string | null='';


  constructor(private userService:UserServiceService,
    private router:Router,
    private location:Location,
    private searchService:SearchService,
    private notificationService:NotificationsService
    ){

  }

  signOut(){
    console.log("signing out");
    this.userService.user_email='';
    this.router.navigate(['/login']);
  }

  goToNotifications(){
    this.notificationService.displayNotificationList=true;
     this.router.navigateByUrl("/profil")
   }

  ngOnInit(): void{
    this.username = this.userService.username;
    this.notificationService.getAllNotifications().subscribe(
      (data:any)=>{
        console.log(data);
        let allNotifs = data as Array<Notification>
        for(let notif of allNotifs){
          let value = localStorage.getItem('notification'+notif.id_notification);
          if(!value){
            this.notificationService.addUnReadNotification(notif.id_notification);
          }
        }
        this.val = localStorage.getItem('notifications');
        this.val=this.val=='0'?'':this.val;
        this.unread_notif_count = this.val?this.val:'';
    
        console.log(this.unread_notif_count)
  
      }
    );
  }

  // Call this method when you want to open the menu
  openMenu() {
    this.menuIconClosed.emit();
  }

  onEnterKeyPressed(){
    this.searchService.setSearchQuery(this.query);
    this.searchService.setFormationsQuery("");
    this.searchService.setMetiersQuery("");
    this.router.navigate(["/search-results"]);
  }
}
