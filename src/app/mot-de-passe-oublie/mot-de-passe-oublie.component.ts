import { Component, TemplateRef, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { UserServiceService } from '../services/user-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-mot-de-passe-oublie',
  templateUrl: './mot-de-passe-oublie.component.html',
  styleUrls: ['./mot-de-passe-oublie.component.scss']
})
export class MotDePasseOublieComponent {

  @ViewChild('errorSheet') errorSheetTemplate = {} as TemplateRef<any>;

  sheetErrorMessage:string="";

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  errorMsg = 'Entrez une adresse mail valide';

  hide:boolean = false;
  step1:boolean = false;
  step2:boolean = false;
  step3:boolean = false;
  successMessage:boolean = false;
  errorMessage:boolean = false;
  email:string = ""

  code:number=0;
  nouveau_pass:string="";
  conf_nouveau_pass:string="";

    constructor(private userService:UserServiceService,private bottomSheet: MatBottomSheet){
      this.changeStep(1);
    }

  verifyLogin():void{
    if(this.nouveau_pass==this.conf_nouveau_pass){
      this.userService.recoverPassword(this.email,this.code,this.conf_nouveau_pass).subscribe(
        (data:any)=>{
          //console.log(data);
          this.changeStep(4);
        },
        (error:any)=>{
          //console.log(error);
          this.changeStep(5);
        }
      )
    }
    
  }
  changeStep(step:number):void{
    if(step == 1){
       this.step1 = true;

       this.step2=false;
       this.step3=false;
       this.successMessage = false;
       this.errorMessage = false;

    } else if(step == 2){
      if(this.email){
        this.userService.recoverAccount(this.email).subscribe(
          (data: any) => {
            if (data.status === "CODE_SENT") {
              this.step2 = true;
              this.step1 = false;
              this.step3 = false;
              this.successMessage = false;
              this.errorMessage = false;
            }
          },
          (error: any) => {
            // Handle error here
           // console.error("An error occurred:", error);
              this.sheetErrorMessage = "Aucun compte n'existe avec cet email";
              this.openBottomSheet();
             // console.log("Aucun compte n'existe avec cet email");
            // Display an error message or perform any other action as needed
          }
        );
      }
      
      
    }else if(step == 3){
      this.step3=true;

      this.step1=false;
      this.step2=false;
      this.successMessage = false;
      this.errorMessage = false;
    }else if(step==4){
      this.successMessage = true;

      this.step1=false;
      this.step2=false;
      this.step3 = false;
      this.errorMessage = false;
    }else if(step == 5){
      this.errorMessage = true;

      this.step1=false;
      this.step2=false;
      this.successMessage = false;
      this.step3 = false;
    }
  }

  openBottomSheet(config?: MatBottomSheetConfig){
    this.bottomSheet.open(this.errorSheetTemplate, config);
  }
  closeBottomSheet(){
    this.bottomSheet.dismiss(this.errorSheetTemplate);
  }
  resendCode(){
    
  }

}


