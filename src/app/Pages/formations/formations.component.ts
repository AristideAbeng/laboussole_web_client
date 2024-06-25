import { Component, HostListener, OnInit,DoCheck,Renderer2, ElementRef, FactoryProvider, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculte } from 'src/app/Models/faculte';
import { Universite } from 'src/app/Models/universite';
import { UserInfo } from 'src/app/Models/userInfo';
import { CentreInteretsService } from 'src/app/services/centre-interets.service';
import { OffreFormationService } from 'src/app/services/offre-formation.service';
import { ReccommendationsService } from 'src/app/services/reccommendations.service';
import { SearchService } from 'src/app/services/search.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss'],
})
export class FormationsComponent {
  constructor(
    private service: OffreFormationService,
    private router: Router,
    private route: ActivatedRoute,
    private searchService:SearchService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private userService: UserServiceService,
    private centreInteretService:CentreInteretsService,
    private reccomendationsService:ReccommendationsService
  ) {}

  query:string="";

  isMenuIconClicked = false;
  isMenuIconClosed = true;
  showSearchBar = false;
  // formation!: Formations[];
  formations!: Universite[];
  // formations: any;
  showSideBar = false;
  overlay!:HTMLDivElement | null;

  reccomendationsList: Array<Faculte> = new Array();
  initialReccomendationsList: Array<Faculte> = new Array()

  CamerUniv: Array<Universite> = new Array();
  CongoUniv: Array<Universite> = new Array();

  pays:string  = "";

  public getScreenWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getScreenWidth = window.innerWidth;
    //console.log(this.getScreenWidth);
    // this.getScreenWidth <= 480? this.mobile = true : this.mobile = false;
    // 768px portrait

    // console.log(this.mobile);
  }

  ngOnInit() {
    this.enableScroll();
    window.scrollTo(0,0);
    this.getScreenWidth = window.innerWidth;
    // this.getScreenWidth <= 480? this.mobile = true : this.mobile = false;

    this.reccomendationsService.getFacultesReccomendations("santé","cameroun","",1).subscribe(
      (data)=>{
        console.log(data);
      }
    )

    this.service.getUniversites().subscribe((data: any) => {
      //console.log(data);
      let d:Array<Universite> = data as Array<Universite>;
      for(let univ of d){
        if(univ.pays=='Cameroun'){
          this.CamerUniv.push(univ);
        }else{
          this.CongoUniv.push(univ);
        }
      }
      this.formations = data;
      // console.log(this.formations);
    });
    //console.log(this.userService.user_email);
    let m:string | null = localStorage.getItem('user_email');
    //console.log(m);

    if(m){
      this.userService.getUserInfo().subscribe(
        (data:any) => {
          //console.log(data);
          let user = data as UserInfo;
          //console.log(user.centres_interet);
          let final_centres:string = "";

          let ci:Array<string> = user.centres_interet.split(" ");
          //console.log("-----ci------")
          ////console.log(ci);

          for(let c of ci){
            final_centres = final_centres + this.centreInteretService.champ_lexical.get(c);
          }

          this.reccomendationsService.getFacultesReccomendations(final_centres,"","",1).subscribe(
            (data:any) => {
              console.log(data);
              let res:Array<Faculte> = (data.recommendations).map((item: any) => this.convertToTargetType(item));
              this.reccomendationsList = this.shuffleArray(res);
              this.initialReccomendationsList = this.reccomendationsList.slice(0,5);
              this.searchService.formationsReccomandations =   this.shuffleArray(res);
            }
          )
        }
      )
    }
  }
  navigateToDetails(itemId: number) {
    this.router.navigate(['/universites', itemId]); // Navigate to details route with item ID
  }

  navigateToFaculteDetails(itemId: number) {
    this.router.navigate(['/facultes', itemId]); // Navigate to details route with item ID
  }

  toggleMenu() {
    this.isMenuIconClicked = !this.isMenuIconClicked;
    this.isMenuIconClosed = !this.isMenuIconClosed;
  }

  handleClick(){
    this.searchService.showFormationsReccomandations=false;
    this.router.navigateByUrl("/voir-tout-formations");
  }

  onEnterKeyPressed(){
    this.searchService.setSearchQuery("");
    this.searchService.setFormationsQuery(this.query);
    this.searchService.setMetiersQuery("");
    this.searchService.alreadyOnSearchPage=true;
    this.router.navigateByUrl("/search-results")
  }

  convertToTargetType(source: any): Faculte {
    return new Faculte(
      source.faculte_id,
      source['nom.1'],
      source['descriptif.1'],
      source.condition_admission,
      source.email.toString(), // Convert number to string if necessary
      source.telephone,
      0, // Placeholder for universite, update as needed
      '', // Placeholder for logo, update as needed
      '', // Placeholder for imageurl, update as needed
      source['images_pc.1'],
      source['images_tablettes.1'].toString(), // Convert number to string if necessary
      source['images_telephone.1'].toString() // Convert number to string if necessary
    );
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

  showMobileMenu(){
    const menu:HTMLDivElement =  this.elementRef.nativeElement.querySelector('.mobileMenu');
   // console.log(menu)
    if (menu) {
      this.overlay = document.createElement('div');
        this.overlay.style.position = 'fixed';
        this.overlay.style.top = '0';
        this.overlay.style.left = '0';
        this.overlay.style.width = '100%';
        this.overlay.style.height = '100%';
        this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Adjust transparency here
        this.overlay.style.zIndex = '2'; // Ensure it's on top of everything else
        document.body.appendChild(this.overlay);
      //console.log("menu is ok")
      menu.style.display = 'block';
      menu.style.position = 'fixed'; // Position the element relative to the viewport
      menu.style.top = '0'; // Position it at the top of the viewport
      menu.style.left = '0'; // Position it at the left of the viewport
      menu.style.width = '80%'; // Make it occupy the full width of the viewport
      menu.style.height = '100%'; // Make it occupy the full height of the viewport
      menu.style.zIndex = '3'; // Ensure it's on top of other elements
    
      // Optionally, you can set other styles as needed, such as background color or transparency
      menu.style.backgroundColor = 'rgba(255, 255, 255)'; // Semi-transparent black background
    }

  }

  hideOverlay() {
    if (this.overlay && this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
        this.overlay = null; // Reset overlay reference
    }
  }

  voirToutesLesReccomandations(){
    this.searchService.showFormationsReccomandations=true;
    this.router.navigateByUrl("/voir-tout-formations");
  }

  closeMenu(){
    this.hideOverlay();
    const menu:HTMLDivElement =  this.elementRef.nativeElement.querySelector('.mobileMenu');
    if(menu){
      menu.style.display = 'none';
    }

  }

  shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = array.slice(); // Make a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate random index
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
  }

  onPaysSelectionChange(){
    let m:string | null = localStorage.getItem('user_email');
    //console.log(m);

    if(m){
      this.userService.getUserInfo().subscribe(
        (data:any) => {
         // console.log(data);
          let user = data as UserInfo;
         // console.log(user.centres_interet);
          let final_centres:string = "";

          let ci:Array<string> = user.centres_interet.split(" ");
          //console.log("-----ci------")
          //console.log(ci);

          for(let c of ci){
            final_centres = final_centres + this.centreInteretService.champ_lexical.get(c);
          }

          //console.log("----------final ci---------")
          //console.log(final_centres)

          //console.log(this.pays);

          this.service.getFacultesReccomendations(final_centres,this.pays).subscribe(
            (data:any) => {
              //console.log(data);
              let res:Array<Faculte> = data.results as Array<Faculte>
              this.reccomendationsList = this.shuffleArray(res);
              this.initialReccomendationsList = this.reccomendationsList.slice(0,5);
              this.searchService.formationsReccomandations =   this.shuffleArray(res);
            }
          )
        }
      )
    }
  }
}
