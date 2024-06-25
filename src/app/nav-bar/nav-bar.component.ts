import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '../Models/userInfo';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isMenuIconClicked = false;
  isMenuIconClosed = true;
  showSearchBar = false;

  isLoggedIn:boolean=false;

  constructor(private userService:UserServiceService,private router:Router){
  }

  ngOnInit(): void {
    this.verifyLogin();
    this.userService.profile_incomplete=false;
  }

  reloadComponent() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
    this.verifyLogin();
  }

  verifyLogin(){
    //console.log("********************Before Logging*****************")
    //console.log(localStorage.getItem("access_token"))
    this.userService.getUserInfo().subscribe(
      (data) => {
       //console.log(data);
        let v:UserInfo = data as UserInfo;
        if(!localStorage.getItem("access_token")){
         //console.log("did not get access token")
          localStorage.setItem("user_email","");
        }else{
          this.isLoggedIn=true;
          this.userService.username= v.username;
          this.userService.user_photo=v.photo_de_profil;
          this.userService.centres_interets = v.centres_interet;
  
          this.userService.profile_incomplete=false;
          
          if(v.dernier_diplome=='AUCUN' || v.serie=="AUCUN" || v.genre=='NON DEFINI' || v.niveau=='AUCUN'){
            this.userService.profile_incomplete=true;
            console.log("failed level 1 profile check")
          }else if(v.date_de_naissance?.toString()=='1920-01-01'){
            console.log("failed level 2 profile check")
            this.userService.profile_incomplete=true;
          }else{
            let t:string= v.telephone?v.telephone:"";
            if(t.length<6){
              console.log("failed level 2 profile check")
              this.userService.profile_incomplete=true; 
            }
            
          }
        }
         
        
       
      },
      (error) => {
        this.isLoggedIn=false;
        //console.error("An error occurred:", error);
        localStorage.setItem("user_email","");
        localStorage.setItem("access_token","");
      }
    ); 
  }

  toggleMenu() {
    this.isMenuIconClicked = !this.isMenuIconClicked;
    this.isMenuIconClosed = !this.isMenuIconClosed;
  }
}
