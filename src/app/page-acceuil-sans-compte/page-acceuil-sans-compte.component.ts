import { Component,ElementRef,OnInit,Renderer2, ViewChild,HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AskLoginDialogComponent } from '../ask-login-dialog/ask-login-dialog.component';
import { Article } from '../Models/article';
import { Notification } from '../Models/notification';
import { Temoignage } from '../Models/temoignage';
import { UserInfo } from '../Models/userInfo';
import { ActualitesService } from '../services/actualites.service';
import { NotificationsService } from '../services/notifications.service';
import { TemoignageService } from '../services/temoignage.service';
import { UserServiceService } from '../services/user-service.service';
import { trigger, state, style, transition, animate } from '@angular/animations';




@Component({
  selector: 'app-page-acceuil-sans-compte',
  templateUrl: './page-acceuil-sans-compte.component.html',
  styleUrls: ['./page-acceuil-sans-compte.component.scss'],
  animations: [
    trigger('zoomInOut', [
      state('in', style({ transform: 'scale(1)' })),
      transition('* => *', [
        style({ transform: 'scale(0.5)' }),
        animate(700)
      ])
    ]),
   
  ]
})

export class PageAcceuilSansCompteComponent {

  description_Metier:string = "Découvre l'univers des métiers avec  LABOUSSOLE, explore une multitude de professions passionnantes et trouve ton métier de rêve."
  description_Bourses:string = "LABOUSSOLE te donne accès à un large éventail de bourses d'études pour t’aider à financer tes études et réaliser tes rêves"
  description_Voyages_Etudes:string = "Tu as envie de poursuivre tes études à l’extérieur ?  Nous mettons à ta disposition les informations dont tu auras besoins pour réussir à l’étranger."
  description_Formation:string = "LABOUSSOLE te donne les informations sur toutes les offres de formations au Cameroun et au Congo afin que tu puisses choisir aisément ta Filière d’étude."
  

  options: any[] = [
    {
      class: 'metier',
      title: 'Métier',
      description: this.description_Metier,
      icon_name: 'direction board.png',
      color: '#5B72EE',
      routerLink: '/metiers',
      isVisible:false
    },
    {
      class: 'formation',
      title: 'Formation',
      description: this.description_Formation,
      icon_name: 'open book.png',
      color: '#41BE90',
      routerLink: '/universites',
      isVisible:false
    }
  ];

  temoignages!: Array<Temoignage>;
  temoignagesList!:Array<any>;
  allArticles!:Array<Article>;

  popupArticle_image:string = "";
  popupArticle_heading:string = "";
  popupArticle_id:number=1;

  picturesMap:Map<string,string> = new Map();

  metierIsVisible:number=0;

  showPopupNotification:boolean = false;
  private timeoutId: any;
 

  currentTemoignageNumber:number=0;

  private overlay!: HTMLDivElement | null;

  @ViewChild('floatingDiv') floatingDiv!: ElementRef;

  constructor(private TemoignageService:TemoignageService,
              private userService:UserServiceService,
              private articleService:ActualitesService,
              private notificationService:NotificationsService,
              private router:Router,
              public dialog: MatDialog,
              private renderer: Renderer2,
              private elementRef: ElementRef){
    this.temoignages = this.TemoignageService.list_temoignages;
    //console.log(this.temoignages)
  }

  ngOnInit(): void {


    window.scrollTo(0,0);

    this.fetchAllArticles();

    const observer1 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Call your function here
          this.onScroll30Percent();
          //observer1.disconnect(); // Disconnect the observer to avoid further observations
        }
      });
    }, { threshold: 0.5 }); // Use a threshold of 0.4 to trigger when 40% of the observed element is visible

    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Call your function here
          this.onScroll60Percent();
          //observer2.disconnect(); // Disconnect the observer to avoid further observations
        }
      });
    }, { threshold: 0.6 }); 
    const observer3 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Call your function here
          this.onScroll100Percent();
          //observer3.disconnect(); // Disconnect the observer to avoid further observations
        }
      });
    }, { threshold: 1.0 }); 
    // Identify the element that represents the 40% mark of the page
    const thirtyPercentElement = this.elementRef.nativeElement.querySelector('.optionsList');
    
    // Start observing the element
    observer1.observe(thirtyPercentElement);
    observer2.observe(thirtyPercentElement);
    observer3.observe(thirtyPercentElement);
    
    this.TemoignageService.getTemoignages().subscribe(data => {
     // console.log(data);
      this.temoignages = data as Array<Temoignage>

    });
    this.TemoignageService.getTemoignages().subscribe(
      (data:any)=>{
        //console.log(data);
        let d = data as Array<Temoignage>
        

        for(let tem of d){
          this.picturesMap.set(tem.nom,tem.tem_photo)
          
        }
        this.temoignagesList = d.reverse();
      }
    );

    this.notificationService.getAllNotifications().subscribe(
      (data:any)=>{
        //console.log(data);
        let notifs:Array<Notification> = data as Array<Notification>;
        for(let notif of notifs){
          if(notif.image_tablette.includes('popup')){
            this.popupArticle_heading = notif.titre;
            this.popupArticle_id = notif.id_notification;
            this.popupArticle_image =notif.image_pc;
          }
        }
      }
    )
   
    
    
  }
  ngAfterViewInit(){
    const currentDate = new Date();

    const currentDay = currentDate.getDate(); // Get the day (1-31)
    const currentMonth = currentDate.getMonth() + 1; // Get the month (0-11), adding 1 to make it 1-12
    const currentYear = currentDate.getFullYear(); // Get the year (e.g., 2024)

    let dt = localStorage.getItem("currentdate");
    let launch:boolean = false;
    if(dt){
      if(dt==currentDay+'/'+currentMonth+'/'+currentYear){
        launch=false;
      }else{
        launch=true;
      }
    }else{
      launch = true;
    }
    
    if(launch){
      this.timeoutId = setTimeout(() => {
      
        // Get the current scroll position
        const scrollY = window.scrollY;
  
        if (this.floatingDiv && this.floatingDiv.nativeElement) {
          this.renderer.setStyle(this.floatingDiv.nativeElement, 'display', 'flex');
          this.renderer.setStyle(this.floatingDiv.nativeElement, 'top', `${scrollY+100}px`);
          this.renderer.addClass(this.floatingDiv.nativeElement, 'floating-div'); // Start animation
          this.showPopupNotification = true;
         
          this.disableScroll();
  
          this.overlay = document.createElement('div');
          this.overlay.style.position = 'fixed';
          this.overlay.style.top = '0';
          this.overlay.style.left = '0';
          this.overlay.style.width = '100%';
          this.overlay.style.height = '100%';
          this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Adjust transparency here
          this.overlay.style.zIndex = '2'; // Ensure it's on top of everything else
          document.body.appendChild(this.overlay);
          
  
        }
  
        const currentDate = new Date();
  
        const currentDay = currentDate.getDate(); // Get the day (1-31)
        const currentMonth = currentDate.getMonth() + 1; // Get the month (0-11), adding 1 to make it 1-12
        const currentYear = currentDate.getFullYear(); // Get the year (e.g., 2024)
  
        localStorage.setItem("currentdate",currentDay+'/'+currentMonth+'/'+currentYear);
  
      // Set the top position of the floating div to the current scroll position
      
      }, 10000);
    }
  }
  

 ngOnDestroy(){
  this.clearTimeout();
  this.closePopup();
 }

  

  fetchAllArticles(){
    this.articleService.getAllArticles().subscribe(
      (data:any)=>{
       // console.log(data);
        this.allArticles = data as Array<Article>;
        
      }
    )
  }

  viewArticle(id:number){
    //console.log(id);
    this.articleService.setCurrentArticle(id);
    this.router.navigateByUrl("/details-actualites")
  }
  
  formVar(temp: HTMLAnchorElement){
    //console.log(temp);
  }
  nextTemoignage(){
    this.currentTemoignageNumber = (this.currentTemoignageNumber+1)%this.temoignages.length
  }

  prevTemoignage(){
    this.currentTemoignageNumber = this.currentTemoignageNumber==0? this.temoignages.length-1:this.currentTemoignageNumber-1
    this.currentTemoignageNumber = this.currentTemoignageNumber%this.temoignages.length
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
    this.hideOverlay()
  }

  hideOverlay() {
    if (this.overlay && this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
        this.overlay = null; // Reset overlay reference
    }
  }

  laisserTemoignage(){
    if(this.userService.user_email){
      this.router.navigateByUrl("/temoignages/0")
    }else{
      this.openDialog("1ms","0ms")
    }
    
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AskLoginDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId); // Clear the timeout if it's set
      this.timeoutId = null; // Reset the timeout ID
    }
  }
  viewNotification(id:number){
    this.notificationService.setCurrentNotification(id)
    this.router.navigateByUrl("/details-notifications")
    // Set data in localStorage
    const value = localStorage.getItem('notification'+id);
    if(value){
      
    }else{
      this.notificationService.reduceUnReadNotifications(id);
      localStorage.setItem('notification'+id,'1');
    }
    

  }
  convertDriveLinkToDirectDownloadLink(driveLink: string): string | null {
    if(driveLink){
      const regexDirectDownload = /https:\/\/drive\.google\.com\/thumbnail\?&id=([^/]+)/;
      const matchDirectDownload = driveLink.match(regexDirectDownload);
  
      if (matchDirectDownload && matchDirectDownload.length === 2) {
          // The link is already in the desired format, return it as is
          return driveLink;
      }
  
      // Check if the provided link matches the Google Drive file link pattern
      const regexFileLink = /https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/view\?usp=sharing/;
      const matchFileLink = driveLink.match(regexFileLink);
  
      if (matchFileLink && matchFileLink.length === 2) {
          const fileId = matchFileLink[1];
          const directDownloadLink = `https://drive.google.com/thumbnail?&id=${fileId}`;
          return directDownloadLink;
      } else {
         // console.error("Invalid Google Drive shareable link format.");
          return null;
      }
    }else{
      return null;
    }
  }

  onScroll30Percent() {
   // console.log('User has scrolled 30% of the optionsList');
    this.options[0].isVisible=true;
  }
  onScroll60Percent() {
   // console.log('User has scrolled 60% of the optionsList');
    this.options[1].isVisible=true;
  }
  onScroll100Percent(){
    this.options[0].isVisible=false;
    this.options[1].isVisible=false;
  
  }

}
