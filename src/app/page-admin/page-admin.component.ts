import { Component } from '@angular/core';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.scss']
})
export class PageAdminComponent {

 showHomePanel:boolean = false;
 showUtilisateursPanel:boolean = false;
 showOffresDeFormations:boolean = false;
 showBoursesEtudes:boolean = false;
 showVoyagesEtudes:boolean = false;


 constructor(){
   this.changePanel(1);
 }

 changePanel(panelNum:number){
  console.log(panelNum);
  if(panelNum==1){
    this.showHomePanel = true;
    this.showUtilisateursPanel = false;
    this.showOffresDeFormations = false;
    this.showBoursesEtudes = false;
    this.showVoyagesEtudes = false;
  } else if(panelNum==2){
    this.showHomePanel = false;
    this.showUtilisateursPanel = true;
    this.showOffresDeFormations = false;
    this.showBoursesEtudes = false;
    this.showVoyagesEtudes = false;
  } else if(panelNum==3){
    this.showHomePanel = false;
    this.showUtilisateursPanel = false;
    this.showOffresDeFormations = true;
    this.showBoursesEtudes = false;
    this.showVoyagesEtudes = false;
  }else if(panelNum==4){
    this.showHomePanel = false;
    this.showUtilisateursPanel = false;
    this.showOffresDeFormations = false;
    this.showBoursesEtudes = true;
    this.showVoyagesEtudes = false;
  }else if(panelNum==5){
    this.showHomePanel = false;
    this.showUtilisateursPanel = false;
    this.showOffresDeFormations = false;
    this.showBoursesEtudes = false;
    this.showVoyagesEtudes = true;
  }
 }

}
