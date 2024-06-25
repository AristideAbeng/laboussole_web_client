import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTemoignageDialogComponent } from '../input-temoignage-dialog/input-temoignage-dialog.component';
import { Temoignage } from '../Models/temoignage';
import { User } from '../Models/user';
import { UserInfo } from '../Models/userInfo';
import { TemoignageService } from '../services/temoignage.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-temoignages-input',
  templateUrl: './temoignages-input.component.html',
  styleUrls: ['./temoignages-input.component.scss']
})
export class TemoignagesInputComponent {

  temoignageList:Array<Temoignage> = new Array()
  picturesMap:Map<string,string> = new Map();
  temBox_id:string | null="";
  timeoutId: any;

  constructor(public dialog: MatDialog,
    private temoignageService:TemoignageService,
    private userService:UserServiceService,
    private router:Router,
    private route: ActivatedRoute
    ){

  }

  ngAfterViewInit(){
    this.timeoutId = setTimeout(
      ()=>{
        this.temBox_id = this.route.snapshot.paramMap.get('id');
    let s:string=this.temBox_id?this.temBox_id:""
   // console.log(s);
    const sectionElement = document.querySelector('[id="'+s+'"]');
    
    if (sectionElement) {
      const yOffset = sectionElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: yOffset-100, behavior: 'smooth' });
     }else{
     // console.log("section not found")
     }
      },2000
    )
    
  }

  ngOnInit(){
    
    this.reloadTemoignages();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(InputTemoignageDialogComponent, {
      width: '280px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  
    // Subscribe to the afterClosed() method to get a callback when the dialog is closed
    dialogRef.afterClosed().subscribe((result) => {
      // 'result' contains the data passed from the dialog when it is closed
     // console.log('Dialog was closed with result:', result);
      // Add any additional logic here
      this.reloadTemoignages();
    });
  }

  laisserTemoignage(){ 
  }

  reloadTemoignages(){
    this.temoignageService.getTemoignages().subscribe(
      (data:any)=>{
        //console.log(data);
        let d = data as Array<Temoignage>

        for(let tem of d){
          
          this.picturesMap.set(tem.nom,tem.tem_photo)
        }
        this.temoignageList = d.reverse();
      }
    )
  }
}
