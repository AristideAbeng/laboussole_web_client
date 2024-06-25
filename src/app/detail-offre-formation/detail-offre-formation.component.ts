import { Component, ElementRef, HostListener } from '@angular/core';
import { Metier } from '../Models/metier';
import { ActivatedRoute, Router } from '@angular/router';
import { OffreFormationService } from '../services/offre-formation.service';
import { map } from 'rxjs';
import { FiliereFormation } from '../Models/filiere-formation';
import { Faculte } from '../Models/faculte';
import { Universite } from '../Models/universite';
import { MatDialog} from '@angular/material/dialog';
import { AskLoginDialogComponent } from 'src/app/ask-login-dialog/ask-login-dialog.component';
import { UserServiceService } from '../services/user-service.service';
import { CompleteProfileDialogComponent } from '../complete-profile-dialog/complete-profile-dialog.component';

@Component({
  selector: 'app-detail-offre-formation',
  templateUrl: './detail-offre-formation.component.html',
  styleUrls: ['./detail-offre-formation.component.scss'],
})
export class DetailOffreFormationComponent {
  isMenuIconClicked = false;
  isMenuIconClosed = true;
  showSearchBar = false;

  // about service
  metierId!: any;
  metierItem!: Metier;
  competences!: string[];
  missions!: string[];
  entreprises!:Array<string>;
  formations:Array<Faculte> = new Array();
  linked_filiere!:FiliereFormation;
  linked_faculte!:Faculte;
  lieu:Map<Faculte,Universite> = new Map();
  hideAll:boolean=true;
  salaire:Array<string> = new Array();

  scrollTimeout: any; 
  constructor(
    private metierRoute: ActivatedRoute,
    private service: OffreFormationService,
    public dialog: MatDialog,
    private userService:UserServiceService,
    private router:Router,
    private elementRef: ElementRef
  ) {}


  ngOnInit() {

    window.scrollTo(0,0)
    this.metierId = this.metierRoute.snapshot.paramMap.get('id_metiers'); // Get cart item ID from route
    //console.log(this.metierId);


    if (this.metierId) {
      this.service
        .getMetierDetails(this.metierId)
        .subscribe((response: any) => {
          //console.log("returned with metier details")
          // console.log(response);
          this.metierItem = response;
          this.competences = this.removeBraces(this.metierItem.competencescles).split(',');
          this.missions = this.removeBraces(this.metierItem.principales_missions).split(',');
          this.entreprises = this.removeBraces(this.metierItem.entreprisesrecrutent).split(',');
          this.salaire = this.metierItem.salairemoyen.split(',');
          //console.log(this.metierItem);
         // console.log(this.competences);

          if(this.metierItem.faculte){
            let facs:Array<string> =this.removeBraces(this.metierItem.faculte).split(',');
         // console.log(facs)
          for(let i of facs){
            let id:number = Number(i)
          //  console.log(id);
            this.service.getFacultes(id).subscribe(
              (data:any)=>{
             //   console.log(data);
                let fac:Faculte = data as Faculte;
                //this.lieu.set(fac,new Universite(0,'','','','','','','','','',''));
                this.service.getUniversiteDetails(fac.universite).subscribe(
                  (data:any) => {
                  //  console.log(data);
                    let univ:Universite = data as Universite;
                    this.lieu.set(fac,univ);
                  }
                )
              }
            )
          }
          }
          if(this.metierItem.ecole){
            let ecoles:Array<string> =this.removeBraces(this.metierItem.ecole).split(',');
          //console.log(ecoles)
          for(let i of ecoles){
            let id:number = Number(i)
            //console.log(id);
            this.service.getFacultes(id).subscribe(
              (data:any)=>{
               // console.log(data);
                let fac:Faculte = data as Faculte;
                //this.lieu.set(fac,new Universite(0,'','','','','','','','','',''));
                this.service.getUniversiteDetails(fac.universite).subscribe(
                  (data:any) => {
                  //  console.log(data);
                    let univ:Universite = data as Universite;
                    this.lieu.set(fac,univ);
                  }
                )
              }
            )
          }
          }
        });
    }

    // this.metierItem = this.service.getCartItemById(this.metierId); // Retrieve specific cart item details
  }
 ngAfterViewInit(){
  window.scrollTo(0,0)
  const currentDate = new Date();

    const currentDay = currentDate.getDate(); // Get the day (1-31)
    const currentMonth = currentDate.getMonth() + 1; // Get the month (0-11), adding 1 to make it 1-12
    const currentYear = currentDate.getFullYear(); // Get the year (e.g., 2024)

    let dt = localStorage.getItem("profile_reminder");
    let launch:boolean = false;
    if(dt){
      if(dt==currentDay+'/'+currentMonth+'/'+currentYear){
        launch=false;
      }else{
        launch=true;
        localStorage.setItem("profile_reminder",currentDay+'/'+currentMonth+'/'+currentYear)
      }
    }else{
      launch = true;
      localStorage.setItem("profile_reminder",currentDay+'/'+currentMonth+'/'+currentYear)
    }

    if(!localStorage.getItem('user_email')){
      const fortyPercentElement:HTMLDivElement = this.elementRef.nativeElement.querySelector('#blurMark1');
      fortyPercentElement.style.filter = 'blur(7.5px)';
      this.hideAll=true;
    }else{
      if(this.userService.profile_incomplete && launch){
        this.openDialog("5ms","5ms");
      }
      this.hideAll=false;
    }

 }
  //aside
  toggleMenu() {
    this.isMenuIconClicked = !this.isMenuIconClicked;
    this.isMenuIconClosed = !this.isMenuIconClosed;
  }

  handleClick(sectionId: string){
   // console.log(sectionId);
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const yOffset = sectionElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
     }else{
     // console.log("section not found")
     }
  }
  goToFaculte(id:number){
    //console.log(id);
    this.router.navigate(['/facultes/', id]);
  }

  onScroll40Percent() {
    // Your function logic when the user has scrolled 40% of the page
    //console.log('User has scrolled 40% of the page');
   
  }
  removeBraces(str: string): string {
    if(str){
      return str.replace(/[{}]/g, '');
    }
    return str;
    
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CompleteProfileDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

