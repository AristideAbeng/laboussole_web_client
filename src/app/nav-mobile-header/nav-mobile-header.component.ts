import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from '../Models/notification';
import { NotificationsService } from '../services/notifications.service';
import { SearchService } from '../services/search.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-nav-mobile-header',
  templateUrl: './nav-mobile-header.component.html',
  styleUrls: ['./nav-mobile-header.component.scss']
})
export class NavMobileHeaderComponent {


  constructor(
    private searchService:SearchService,
    private router:Router,
    private userService:UserServiceService,
    private notificationService:NotificationsService){

  }

  @Output() menuIconClosed = new EventEmitter<void>();
  
  query:string="";
  username:string = "default";
  
  showSearchBar = false;

  hideMenuIcon = false;

  showDropdown = false;


  hideOthers:boolean=false;

  unread_notif_count:string='';
  val:string | null='';

  // Call this method when you want to open the menu
  openMenu() {
    this.menuIconClosed.emit();
  }
  toggleSearchBar(){

  }
  
 ngOnInit(){
  this.notificationService.getAllNotifications().subscribe(
    (data:any)=>{
      //console.log(data);
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
  
     // console.log(this.unread_notif_count)

    }
  );
 }

 goToNotifications(){
  this.notificationService.displayNotificationList=true;
   this.router.navigateByUrl("/profil")
 }

  ngDoCheck(){
    
    this.val = localStorage.getItem('notifications');
    this.val=this.val=='0'?'':this.val;
    this.unread_notif_count = this.val?this.val:'';
    
    //console.log(this.unread_notif_count)
  }
  signOut(){
    //console.log("signing out");
    this.userService.user_email='';
    localStorage.setItem('user_email'," ");
    this.router.navigate(['/']);
  }
  onEnterKeyPressed(){
    this.searchService.setSearchQuery(this.query)
    this.searchService.setFormationsQuery("");
    this.searchService.setMetiersQuery("");
    if(this.searchService.alreadyOnSearchPage){
      this.searchService.setSearchQuerye(this.query)
    }else{
      this.searchService.alreadyOnSearchPage=true;
      this.router.navigate(['/search-results']);
    }
  }
  handleClick(){
    this.hideOthers=!this.hideOthers;
    //console.log(this.hideOthers)
  }
}
