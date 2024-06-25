import { Component ,OnInit} from '@angular/core';
import { UserInfo } from '../Models/userInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../services/notifications.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  current_location:string = "modifier profil";
  location_number:number = 1;
  username:string="";
  profile_image:string="";
  selectedFile!: File;
  unread_notif_count:string='';
  val:string | null='';
  page: string | null ="";
  


  constructor(private userService:UserServiceService,
    private notificationsService:NotificationsService,
    private router:Router,
    private route: ActivatedRoute){

  }

  ngDoCheck(){
    this.page = this.route.snapshot.paramMap.get('page');
    let m:string = this.page?this.page:"0";
    this.location_number=Number(m);
    this.changeLabel(Number(m))
    this.val = localStorage.getItem('notifications');
    this.val=this.val=='0'?'':this.val;
    this.unread_notif_count = this.val?this.val:'';
    
    //console.log(this.unread_notif_count)
  }
  changeLabel(n:number){
    if(n==0){
      this.current_location="";
    }
    if(n==1){
      this.current_location = "modifier profil"
    }else if(n==2){
      this.current_location = "notifications"
    }else if(n==3){
      this.current_location = "changer mot de pass"
    }else if(n==4){
      this.current_location="faq"
    }
  }
  ngOnInit(){
    
    window.scrollTo(0,0);
    this.verifyLogin();
   if(this.notificationsService.displayNotificationList){
    this.router.navigateByUrl("/profil/2")
    this.notificationsService.displayNotificationList = false;
   }
  }
  onFileSelected(event:any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profile_image = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
    this.userService.chosenImage=this.selectedFile;
    this.userService.updateProfilePhoto(this.selectedFile).then((response) => {
      console.log(response);
      
    })
    .catch((error) => {
      //console.log("error")
      //console.log(error);
         
    });
  }

  verifyLogin(){
    this.userService.getUserInfo().subscribe(
      (data) => {
        //console.log(data);
        let v:UserInfo = data as UserInfo;
        this.username = v.username?v.username:this.username;
        this.profile_image=v.photo_de_profil?v.photo_de_profil:this.profile_image;

        
      },
      (error) => {
        //console.error("An error occurred:", error);      
      }
    );
  }
}
