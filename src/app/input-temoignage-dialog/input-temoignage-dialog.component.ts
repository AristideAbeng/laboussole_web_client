import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Temoignage } from '../Models/temoignage';
import { TemoignageService } from '../services/temoignage.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-input-temoignage-dialog',
  templateUrl: './input-temoignage-dialog.component.html',
  styleUrls: ['./input-temoignage-dialog.component.scss']
})
export class InputTemoignageDialogComponent {

  selectedRating:number=0;
  text:string="";

  constructor(
    public dialogRef: MatDialogRef<InputTemoignageDialogComponent>,
    private temoignageService: TemoignageService,
    private userService:UserServiceService
    ){

  }

  noteRating(i:number){
    this.selectedRating=i;

  }
  enregistrerTemoignage(){
    //console.log(this.text)
    //console.log(this.selectedRating)
    const currentDate = new Date();

    const currentDay = currentDate.getDate(); // Get the day (1-31)
    const currentMonth = currentDate.getMonth() + 1; // Get the month (0-11), adding 1 to make it 1-12
    const currentYear = currentDate.getFullYear(); // Get the year (e.g., 2024)

    if(this.userService.user_email){
      let pho:string=this.userService.user_photo?this.userService.user_photo:"";
      let temoignage = new Temoignage(this.userService.user_email,this.selectedRating+"",this.text,currentDay+'/'+currentMonth+'/'+currentYear,this.userService.username,pho)
      this.temoignageService.postTemoignage(temoignage).subscribe(
        (data:any)=>{
          //console.log(data);
        }
      )
    }
    
  }
}
