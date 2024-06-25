
import { Component,OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { UserInfo } from '../Models/userInfo';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent {

  @ViewChild('errorSheet') errorSheetTemplate = {} as TemplateRef<any>;

  sheetErrorMessage:string="";

  constructor(private userService:UserServiceService,private bottomSheet: MatBottomSheet){

  }

  nom:string="";
  prenom:string="";
  naissance:Date=new Date();
  genre:string="";
  diplome:string="";
  email:string="";
  telephone:string="";
  pays:string="";
  ville:string="";

  ngOnInit(){
    this.verifyLogin();
  }

  updateProfile(){
    let d=this.dateToString(this.naissance);
    //console.log(d);
    this.userService.updateProfile(this.prenom,this.genre,this.diplome,this.pays,this.telephone,this.ville,d)  .then((response) => {
      //console.log(response);

      this.sheetErrorMessage="Enregistrement réussi."
      this.openBottomSheet();
      
    })
    .catch((error) => {
     // console.log(error);
         
    });
  }
  verifyLogin(){
    this.userService.getUserInfo().subscribe(
      (data) => {
        //console.log(data);
        let v:UserInfo = data as UserInfo;
        this.nom = v.first_name? v.first_name:this.nom;
        this.prenom=v.last_name?v.last_name:this.prenom;
        this.naissance= v.date_de_naissance?v.date_de_naissance:this.naissance;
        this.genre=v.genre?v.genre:this.genre;
        this.diplome=v.dernier_diplome?v.dernier_diplome:this.diplome;
        this.email=v.email?v.email:this.email;
        this.pays=v.serie?v.serie:this.pays;
        this.ville=v.niveau?v.niveau:this.ville;
        this.telephone=v.telephone?v.telephone:this.telephone;

        
      },
      (error) => {
        //console.error("An error occurred:", error);      
      }
    );
  }

  dateToString(date: Date | null): string {

    if (typeof this.naissance === 'string') {
      date = new Date(this.naissance);
    }
   

    //console.log(this.naissance);
   // console.log(date);
    if(!date){
     // console.log("date is null");
    }
    if(!(date instanceof Date)){
     // console.log("not an instance of date");
    }
    if(date){
      if(isNaN(date.getTime())){
      //  console.log("getTime is NAN");
      }
    }
    
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      //console.log("returning null")
      return ''; // Return empty string or handle invalid date case accordingly
    }

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 to month because getMonth() returns zero-based month
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  openBottomSheet(config?: MatBottomSheetConfig){
    this.bottomSheet.open(this.errorSheetTemplate, config);
  }
  closeBottomSheet(){
    this.bottomSheet.dismiss(this.errorSheetTemplate);
  }
  onPaysSelectionChange(){
    if(this.pays=='cameroun'){
      this.telephone="+237"
    }else if(this.pays=='congo'){
      this.telephone="+242"
    }else{
      this.telephone=""
    }
  }
}
