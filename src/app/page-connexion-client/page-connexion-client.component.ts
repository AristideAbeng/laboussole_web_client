import { Component,TemplateRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';



@Component({
  selector: 'app-page-connexion-client',
  templateUrl: './page-connexion-client.component.html',
  styleUrls: ['./page-connexion-client.component.scss']
})
export class PageConnexionClientComponent {

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

 constructor(private userService:UserServiceService,
  private router:Router,
  private bottomSheet: MatBottomSheet){

 }
 checkLogin(){
 // console.log(this.email)
 // console.log(this.emailControl.value)
  this.showSpinner=true;
  this.userService.login(this.emailControl.value, this.passwordControl.value).subscribe(
    (data:any) => {
     // console.log(data);
      if (data.hasOwnProperty("access") && data.hasOwnProperty("refresh")) {
        
        localStorage.setItem("access_token",data.access)
        // console.log("valid login");
         this.userService.user_email = this.email.trim();
        // console.log(this.email)
        // console.log(this.emailControl.value)
         localStorage.setItem('user_email', this.email.trim()); // Saving user email in local storage
         this.router.navigate(['/']);
      } else {
        this.showSpinner = false;
        this.sheetErrorMessage = "Erreur d'authentification. Veuillez vérifier vos informations de connexion.";
        this.openBottomSheet();
      }
    },
    (error) => {
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

  hide:boolean = true;
}
