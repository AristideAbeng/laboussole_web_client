import { Component,ElementRef,OnInit,Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Article } from '../Models/article';
import { Temoignage } from '../Models/temoignage';
import { ActualitesService } from '../services/actualites.service';
import { TemoignageService } from '../services/temoignage.service';
import { UserServiceService } from '../services/user-service.service';



@Component({
  selector: 'app-page-acceuil-sans-compte',
  templateUrl: './page-acceuil-sans-compte.component.html',
  styleUrls: ['./page-acceuil-sans-compte.component.scss']
})

export class PageAcceuilSansCompteComponent {

  temoignages!: Array<Temoignage>;
  temoignages2!:Array<any>;
  allArticles!:Array<Article>

  showPopupNotification:boolean = false;
 

  currentTemoignageNumber:number=0;

  @ViewChild('floatingDiv') floatingDiv!: ElementRef;

  constructor(private TemoignageService:TemoignageService,
              private userService:UserServiceService,
              private articleService:ActualitesService,
              private router:Router,
              private renderer: Renderer2){
    this.temoignages = this.TemoignageService.list_temoignages;
    console.log(this.temoignages)
  }

  ngOnInit(): void {
    this.fetchAllArticles();
    this.TemoignageService.getTemoignages().subscribe(data => {
      console.log(data);
      this.temoignages2 = data;
    });
    setTimeout(() => {
      
      // Get the current scroll position
      const scrollY = window.scrollY;

      if (this.floatingDiv && this.floatingDiv.nativeElement) {
        this.renderer.setStyle(this.floatingDiv.nativeElement, 'top', `${scrollY+100}px`);
        this.showPopupNotification = true;
        this.disableScroll();
      }

    // Set the top position of the floating div to the current scroll position
    
    }, 1000);
    
  }

  

 

  description_Metier:string = "Découvre l'univers des métiers  avec  LABOUSSOLE ! Explorez une multitude de professions passionnantes et trouvez le métier qui correspond à ton profil."
  description_Bourses:string = "LABOUSSOLE te donne accès à un large éventail de bourses d'études pour t’aider à financer tes études et réaliser tes rêves"
  description_Voyages_Etudes:string = "Tu as envie de poursuivre tes études à l’extérieur ?  Nous mettons à ta disposition les informations dont tu auras besoins pour réussir à l’étranger."
  description_Formation:string = "LABOUSSOLE te donne les informations sur toutes les offres de formations au Cameroun et au Congo afin que tu puisses choisir aisément ta Filière d’étude."
  

  fetchAllArticles(){
    this.articleService.getAllArticles().subscribe(
      (data:any)=>{
        console.log(data);
        this.allArticles = data as Array<Article>;
      }
    )
  }

  viewArticle(id:number){
    console.log(id);
    this.articleService.setCurrentArticle(id);
    this.router.navigateByUrl("/details-actualites")
  }
  
  formVar(temp: HTMLAnchorElement){
    console.log(temp);
  }
  nextTemoignage(){
    this.currentTemoignageNumber = (this.currentTemoignageNumber+1)%this.temoignages.length
  }

  prevTemoignage(){
    this.currentTemoignageNumber = this.currentTemoignageNumber==0? this.temoignages.length:this.currentTemoignageNumber-1
    this.currentTemoignageNumber = this.currentTemoignageNumber%4
  }
  closePopup(){
    this.enableScroll();
    this.showPopupNotification=false;
    this.renderer.setStyle(this.floatingDiv.nativeElement, 'display', 'none');
  }
  disableScroll(): void {
    // Calculate the current scroll position
    const scrollY = window.scrollY;
  
    // Apply CSS to the body to prevent scrolling
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    this.renderer.setStyle(document.body, 'position', 'fixed');
    this.renderer.setStyle(document.body, 'top', `-${scrollY}px`);
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
  
 
}
