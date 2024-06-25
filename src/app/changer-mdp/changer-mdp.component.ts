import { Component,TemplateRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-changer-mdp',
  templateUrl: './changer-mdp.component.html',
  styleUrls: ['./changer-mdp.component.scss']
})
export class ChangerMdpComponent {
  @ViewChild('errorSheet') errorSheetTemplate = {} as TemplateRef<any>;

  constructor(private userService:UserServiceService, private bottomSheet: MatBottomSheet){

  }

  sheetErrorMessage:string="";
  hide:boolean = true;
  success:boolean=false;

  passwordActuel:string="";
  passwordControlActuel = new FormControl('', [Validators.required]);

  passwordNouveau:string="";
  passwordControlNouveau = new FormControl('', [Validators.required]);

  passwordConfirm:string="";
  passwordControlConfirm = new FormControl('', [Validators.required]);
  passerrormsg = 'obligatoire';

  updatePassword(){
  //console.log(this.passwordNouveau != this.passwordConfirm)
  if(this.passwordNouveau != this.passwordConfirm){
    this.sheetErrorMessage = "Erreur d'authentification. mots de passe dissemblable.";
    this.openBottomSheet();
  }else{
    let email = this.userService.user_email;
    //console.log(email);
  this.userService.login(email, this.passwordControlActuel.value).subscribe(
    (data) => {
      //console.log(data);
      if (data.hasOwnProperty("access") && data.hasOwnProperty("refresh")) {
          //console.log("updating password");
          this.userService.updatePassword(this.passwordNouveau).subscribe(
            (data)=>{
             // console.log(data);
              this.sheetErrorMessage = "Mot de passe changé avec succès";
              this.success = true;
              this.openBottomSheet();
            }
          )
        
      } else {
        this.sheetErrorMessage = "Erreur d'authentification. Veuillez vérifier votre mot de pass actuel.";
        this.openBottomSheet();
      }
    },
    (error) => {
      //console.error("An error occurred:", error);
      // Handle error here, for example:
      
        this.sheetErrorMessage = "Erreur d'authentification. Veuillez vérifier vos informations de connexion.";
        this.openBottomSheet();
    
    }
  );
  }
  
  }

  openBottomSheet(config?: MatBottomSheetConfig){
    this.bottomSheet.open(this.errorSheetTemplate, config);
  }
  closeBottomSheet(){
    this.bottomSheet.dismiss(this.errorSheetTemplate);
  }

}
