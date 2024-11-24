import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { UserInfo } from '../Models/userInfo';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-expert-login',
  templateUrl: './expert-login.component.html',
  styleUrls: ['./expert-login.component.scss']
})
export class ExpertLoginComponent {
  loginForm: FormGroup;
  hide = true;
  @ViewChild('errorSheet') errorSheetTemplate = {} as TemplateRef<any>;

  sheetErrorMessage:string="";

  email:string = "";
  password:string = "";

 showSpinner:boolean = false;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  emailControl = new FormControl('', [Validators.required, Validators.email]);
 errorMessage = 'Email invalide';

 passwordControl = new FormControl('', [Validators.required]);
 passerrormsg = 'obligatoire';

  constructor(private fb: FormBuilder,private userService:UserServiceService,private router:Router,
    private bottomSheet: MatBottomSheet) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  ngOnInit(){
    console.log("on init called")
    localStorage.setItem('is_expert',"no");
    localStorage.setItem("user_email","");
    localStorage.setItem("access_token","");
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Handle login logic
      console.log(this.loginForm.value);
    }
  }

  checkLogin(){
    // console.log(this.email)
    // console.log(this.emailControl.value)
     this.showSpinner=true;
     this.userService.login(this.emailControl.value, this.passwordControl.value).subscribe(
       (data:any) => {
         console.log(data);
         if(data.hasOwnProperty("access") && data.hasOwnProperty("refresh")) {
          console.log("entered decisive if block")
            this.showSpinner = false;
            localStorage.setItem("access_token",data.access)
            console.log("valid login");
            this.userService.user_email = this.email.trim();
            // console.log(this.email)
            // console.log(this.emailControl.value)
            localStorage.setItem('user_email', this.email.trim());
           
          this.userService.getUserInfo().subscribe(
            (data) => {
             console.log(data);
              let v:UserInfo = data as UserInfo;
              console.log(v);
              if(v.is_expert){
                console.log("is an expert and id is "+v.expert_id)
                localStorage.setItem('is_expert',"yes");
                localStorage.setItem('user_id',v.id+"");
                localStorage.setItem('expert_id',v.expert_id+"")
                this.router.navigateByUrl("/expert-dashboard/"+v.expert_id)
              }else{
                this.sheetErrorMessage = "Erreur d'authentification. Vous n'avez pas de droit d'access";
                this.openBottomSheet();
              }
               
            },
            (error) => {
              console.error("An error occurred:", error);
              localStorage.setItem("user_email","");
              localStorage.setItem("access_token","");
            }
          ); 
         } else {
          console.log("login failed")
          localStorage.setItem('is_expert',"no");
          localStorage.setItem("user_email","");
          localStorage.setItem("access_token","");
           this.showSpinner = false;
           this.sheetErrorMessage = "Erreur d'authentification. Veuillez vérifier vos informations de connexion.";
           this.openBottomSheet();
         }
       },
       (error) => {
        console.log("login failed")
        console.log(localStorage.getItem('is_expert'));
        localStorage.setItem('is_expert',"no");
        localStorage.setItem("user_email","");
        localStorage.setItem("access_token","");
         //console.error("An error occurred:", error);
         this.showSpinner = false;
         // Handle error here, for example:
         
           this.sheetErrorMessage = "Erreur d'authentification. Veuillez vérifier vos informations de connexion.";
           this.openBottomSheet();
       }
     );
     
    }
    openBottomSheet(config?: MatBottomSheetConfig){
      this.bottomSheet.open(this.errorSheetTemplate, config);
    }
    closeBottomSheet(){
      this.bottomSheet.dismiss(this.errorSheetTemplate);
    }
    trimEmail(){
      let v:string = this.emailControl.value?.trim()?this.emailControl.value?.trim():"";
      this.emailControl.setValue(v);
    }  
}
