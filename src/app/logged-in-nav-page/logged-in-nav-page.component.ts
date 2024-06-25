import { Component, EventEmitter, Output, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-logged-in-nav-page',
  templateUrl: './logged-in-nav-page.component.html',
  styleUrls: ['./logged-in-nav-page.component.scss']
})
export class LoggedInNavPageComponent {

  @Output() menuIconClicked = new EventEmitter<void>();

  showDropdown = false;
  showSearchBar = false;
  username:string="";
  picture:string |null="";
  // Call this method when you want to close the menu
  closeMenu() {
    this.menuIconClicked.emit();
  }

  constructor(private userService:UserServiceService, private router:Router){
    this.picture = this.userService.user_photo;
  }

  ngOnInit(){
    this.username = this.userService.username;
  }

  signOut(){
    console.log("signing out");
    this.userService.user_email='';
    this.router.navigate(['/login']);
  }

}
