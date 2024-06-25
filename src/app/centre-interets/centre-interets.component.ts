import { Component,OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CentreInteret } from '../Models/centreInteret';
import { CentreInteretsService } from '../services/centre-interets.service';
import { UserServiceService } from '../services/user-service.service';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-centre-interets',
  templateUrl: './centre-interets.component.html',
  styleUrls: ['./centre-interets.component.scss']
})
export class CentreInteretsComponent {

  @ViewChild('errorSheet') errorSheetTemplate = {} as TemplateRef<any>;
  sheetErrorMessage:string="";

  All_Centres:Array<CentreInteret> = new Array();
  choices:Set<string> = new Set<string>();
  start:number=0;
  disablebtn:boolean = false;
  page:string|null= "";
  origin:number=0;

  constructor(private centreInteretService:CentreInteretsService,
    private userService:UserServiceService,
    private router:Router,
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet){

  }


  ngOnInit(): void {
    this.centreInteretService.getCentresInterets().subscribe(data => {
      console.log(data);
      data = data as Array<CentreInteret>;
      
      for (let d of data) {
       this.All_Centres.push(d);
      }
    });

    this.page = this.route.snapshot.paramMap.get('origin');
    let m:string = this.page?this.page:"0";
    this.origin= Number(m);
  }
  getSubArray<T>(array: T[], start: number, end: number): T[] {
    //console.log("start is "+start);
    //console.log("end is "+end);
    // Ensure start index is within bounds
    if(start>array.length-11 && start>0){
      this.disablebtn = true;
    }
    let temp_start = Math.max(start, 0);
    // Ensure end index is within bounds
    end = Math.min(end, array.length - 1);

    // Return the subarray between start and end indices using slice
    return array.slice(temp_start, end + 1); // +1 to include the element at end index
   
}

saveChoice(data:string){
  if(this.choices.has(data)){
    this.choices.delete(data);
  }else{
    this.choices.add(data);
  }
  //console.log(this.choices);
   
}
terminateProcess(){
  if(this.choices.size<1){
    this.sheetErrorMessage="N'oubliez pas de choisir au moins un centre d'intérêt";
    this.openBottomSheet();
  }else{
    //console.log(Array.from(this.choices))
    this.userService.updateCentreInterets(Array.from(this.choices)).subscribe(data =>{
      //console.log(data);
      
    });
    if(!this.origin){
      this.router.navigate(['/']);
    }else{
      this.router.navigate(['/profil/0']);
    }
    
  }
 
  
}

openBottomSheet(config?: MatBottomSheetConfig){
  this.bottomSheet.open(this.errorSheetTemplate, config);
}
closeBottomSheet(){
  this.bottomSheet.dismiss(this.errorSheetTemplate);
}

  
}
