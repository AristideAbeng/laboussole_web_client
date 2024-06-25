import { Component } from '@angular/core';

@Component({
  selector: 'app-page-acceuil-admin',
  templateUrl: './page-acceuil-admin.component.html',
  styleUrls: ['./page-acceuil-admin.component.scss']
})
export class PageAcceuilAdminComponent {

  showLoginPage:boolean = false;
  showAdminHomePage:boolean = false;

  constructor(){
    this.changePage(1);

  }
  receiveLoginResult(r:number){
    //console.log(r);
    if(r==1){
     // console.log("changing to page 2");
      this.changePage(2);
    }else{

    }
  }

  changePage(pageNum:number):void{
    if(pageNum == 1){
      this.showLoginPage = true;
      this.showAdminHomePage = false;
    } else if(pageNum == 2){
     // console.log("showing Admin Home page");
      this.showLoginPage = false;
      this.showAdminHomePage = true;
    }
  }
}
