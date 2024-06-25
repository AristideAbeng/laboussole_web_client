import { Component,OnInit,Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-contactez-nous',
  templateUrl: './contactez-nous.component.html',
  styleUrls: ['./contactez-nous.component.scss']
})
export class ContactezNousComponent {


  @ViewChild('errorSheet') errorSheetTemplate = {} as TemplateRef<any>;

  sheetErrorMessage:string="";
  
  isMenuIconClicked = false;
  isMenuIconClosed = true;
  showSearchBar = false;
  message_sent:boolean=true;
  isLoggedIn:boolean=false;

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  messageControl = new FormControl('', [Validators.required]);
  errorMessage = 'Email invalide ou déjà pris';

  nom:string = "";
  telephone:string="";


  constructor(private renderer: Renderer2,
    private bottomSheet: MatBottomSheet,
    private userService:UserServiceService){
  
  }

  

  ngOnInit(){
    this.enableScroll();
    window.scrollTo(0,0);
  }
  toggleMenu() {
    this.isMenuIconClicked = !this.isMenuIconClicked;
    this.isMenuIconClosed = !this.isMenuIconClosed;
  }

  enableScroll(): void {
    // Retrieve the scroll position from the body's top style property
    const scrollY = parseInt(document.body.style.top || '0', 10);
  
    // Remove the applied CSS to enable scrolling
    this.renderer.removeStyle(document.body, 'overflow');
    this.renderer.removeStyle(document.body, 'position');
    this.renderer.removeStyle(document.body, 'top');
  
    // Restore the scroll position
    window.scrollTo(0, Math.abs(scrollY));
  }
  openBottomSheet(config?: MatBottomSheetConfig){
    this.bottomSheet.open(this.errorSheetTemplate, config);
  }
  closeBottomSheet(){
    this.bottomSheet.dismiss(this.errorSheetTemplate);
  }

  envoyerMessage(){
    if(this.emailControl.valid && this.messageControl.valid){

      let m:string=this.emailControl.value?this.emailControl.value:""
      let s:string=this.messageControl.value?this.messageControl.value:"";
      
      this.userService.contactus(m,s).subscribe(
        (data:any)=>{
         // console.log(data);
          this.sheetErrorMessage="Message envoyé avec succès";
          this.telephone="";
          this.messageControl.setValue("");
          this.nom="";
          this.message_sent=true;
          this.openBottomSheet();
         
        },
        (error:any)=>{
          //console.log(error);
          this.message_sent=false;
          this.sheetErrorMessage="Une erreur est survenue pendant l'envoi du message. Assurez-vous d'être connecté(e) avec cet e-mail";
          this.openBottomSheet();
        }
      )
    }else{
      this.message_sent=false;
      this.sheetErrorMessage="Remplissez les champs obligatoire";
      this.openBottomSheet();
    }
  }
}
