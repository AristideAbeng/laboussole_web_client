import { Component,TemplateRef, ViewChild } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-page-creation-compte-client',
  templateUrl: './page-creation-compte-client.component.html',
  styleUrls: ['./page-creation-compte-client.component.scss']
})
export class PageCreationCompteClientComponent {

  @ViewChild('errorSheet') errorSheetTemplate = {} as TemplateRef<any>;

  hide:boolean = true;
  nom:string ="";
  prenom:string="";
  email:string="";
  password:string="";
  confirmPassword:string="";
  sheetErrorMessage:string="";

  showSpinner:boolean = false;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

 
 nameControl = new FormControl('', [Validators.required]);


 emailControl = new FormControl('', [Validators.required, Validators.email]);
 errorMessage = 'Entrez une adresse mail valide';

 passwordControl = new FormControl('', [Validators.required]);
 passerrormsg = 'obligatoire';

 confirmPasswordControl= new FormControl('', [Validators.required]);

conditionsControl:boolean=false;


  constructor(private userService:UserServiceService,private router:Router,private bottomSheet: MatBottomSheet){

  }

  verifierCreerCompte(){
    if(this.nameControl.value=="" || this.emailControl.value=="" || this.passwordControl.value=="" || this.confirmPasswordControl.value=="" || !this.conditionsControl){
      //console.log("invalid form");
      this.sheetErrorMessage = "Pensez à remplir les champs obligatoires et à accepter les conditions.";
      this.openBottomSheet();
    }else{
      if(this.passwordControl.value != this.confirmPasswordControl.value){
       // console.log("invalid form");
        this.sheetErrorMessage = "mot de passes non identiques";
        this.openBottomSheet();
      }else{
        if(this.emailControl.invalid){
          this.sheetErrorMessage = "Email Invalide";
          this.openBottomSheet();
        } else if(this.nameControl.invalid){
          this.sheetErrorMessage = "Nom Invalide";
          this.openBottomSheet();
        }
        else{
          //console.log("isValid");
          this.creerCompte();
        }
        
      }
      
    }
  }

  creerCompte() {
    //console.log([this.nom, this.prenom, this.email, this.password]);
    this.showSpinner=true;
    this.userService.createCompte(this.nom, this.prenom, this.email, this.password)
      .then((response) => {
        //console.log(response);
        if(response.status==201){
          this.userService.updateUserEmail(this.email);
          this.userService.login(this.emailControl.value, this.passwordControl.value).subscribe(
            (data:any) => {
              //console.log(data);
              if (data.hasOwnProperty("access") && data.hasOwnProperty("refresh")) {
                
                localStorage.setItem("access_token",data.access)
                 //console.log("valid login");
                 this.userService.user_email = this.email.trim();
                // console.log(this.email)
                // console.log(this.emailControl.value)
                 localStorage.setItem('user_email', this.email.trim()); // Saving user email in local storage
                 //this.router.navigate(['/']);
              } else {
                this.showSpinner = false;
                //this.sheetErrorMessage = "Erreur d'authentification. Veuillez vérifier vos informations de connexion.";
                //this.openBottomSheet();
              }
            },
            (error) => {
              //console.error("An error occurred:", error);
              this.showSpinner = false;
              // Handle error here, for example:
              
                //this.sheetErrorMessage = "Erreur d'authentification. Veuillez vérifier vos informations de connexion.";
                //this.openBottomSheet();
        
            
            }
          );
          this.router.navigate(['/signup-success']);
        }
      })
      .catch((error) => {
        this.showSpinner=false;
       // console.log(error.error.errors[0]);
       // console.log(error.status);
        if(error.error.errors[0]=='User with email already exits '){
         // console.log("Un compte a déjà été créé avec cet email.");
          this.sheetErrorMessage = "Un compte a déjà été créé avec cet email.";
          this.openBottomSheet();
         
        }else if(error.error.errors[0]=='User with username already exits '){
          this.sheetErrorMessage = "Ce nom d'utilisateur a déjà été pris.";
          this.openBottomSheet();
        }
        else{
          this.router.navigate(['/signup-error']);
        }
       

        
      });
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
