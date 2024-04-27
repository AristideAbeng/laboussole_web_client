import { Component, HostListener, DoCheck,ElementRef,OnInit,Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Metier } from 'src/app/Models/metier';
import { User } from 'src/app/Models/user';
import { UserInfo } from 'src/app/Models/userInfo';
import { OffreFormationService } from 'src/app/services/offre-formation.service';
import { SearchService } from 'src/app/services/search.service';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-offre-de-formations',
  templateUrl: './offre-de-formations.component.html',
  styleUrls: ['./offre-de-formations.component.scss'],
})
export class OffreDeFormationsComponent {
  constructor(
    private service: OffreFormationService,
    private router: Router,
    private route: ActivatedRoute,
    private searchService:SearchService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private userService:UserServiceService
   
  ) {}

  isMenuIconClicked = false;
  isMenuIconClosed = true;
  showSearchBar = false;
  overlay!:HTMLDivElement | null;

  query:string = "";
  // formation!: Formations[];
  metiers!: Metier[];
  initialMetierList:Array<Metier> = new Array();
  initialReccomendationsList:Array<Metier> =new Array();
  recommendationsList:Array<Metier> = new Array()
  popularMetierList:Array<Metier> = new Array()

  // formations: any;
  showSideBar = false;

  public getScreenWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getScreenWidth = window.innerWidth;
    console.log(this.getScreenWidth);
    // this.getScreenWidth <= 480? this.mobile = true : this.mobile = false;
    // 768px portrait

    // console.log(this.mobile);
  }
  ngDoCheck(){
    window.scrollTo(0,0);
  }
  ngOnInit() {
    this.enableScroll()
  
    window.scrollTo(0,0);
    this.getScreenWidth = window.innerWidth;
    // this.getScreenWidth <= 480? this.mobile = true : this.mobile = false;

    this.service.getFormations().subscribe((data: any) => {
      console.log(data);
      this.metiers = data.results;
      let res:Array<Metier> = data.results as Array<Metier>

      this.initialMetierList = res.slice(0,10);
      this.popularMetierList = res.slice(20,25);
      // console.log(this.formations);
    });
    if(this.userService.user_email){
      this.userService.getUserInfo().subscribe(
        (data:any) => {
          console.log(data);
          let user = data as UserInfo;
          console.log(user.centres_interet);

          this.service.getMetiersRecommendations(user.centres_interet).subscribe(
            (data:any) => {
              console.log(data);
              let res:Array<Metier> = data.results as Array<Metier>
              this.recommendationsList = res;
              this.initialReccomendationsList = this.recommendationsList.slice(0,5);
              this.searchService.metierRecommandations = this.recommendationsList;
            }
          )
        }
      )
    }
   
   
  }

  showMobileMenu(){
    const menu:HTMLDivElement =  this.elementRef.nativeElement.querySelector('.mobileMenu');
    console.log(menu)
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
      console.log("menu is ok")
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
  
  closeMenu(){
    this.hideOverlay();
    const menu:HTMLDivElement =  this.elementRef.nativeElement.querySelector('.mobileMenu');
    if(menu){
      menu.style.display = 'none';
    }

  }

  searchCategory(category:string){
    this.closeMenu()
    this.searchService.setSearchQuery("");
    this.searchService.setFormationsQuery("");
    this.searchService.searchingCategory=true;
    this.searchService.setMetiersQuery(category);
    this.router.navigateByUrl("/search-results")
  }
 

  navigateToDetails(itemId: string) {
    this.router.navigate(['/metiers', itemId]); // Navigate to details route with item ID
  }
  voirToutesReccomandatins(){
    this.searchService.showMetierReccomandations=true;
    this.router.navigateByUrl("/voir-tout-metiers");
  }

  voirTousMetiers(){
    this.searchService.showMetierReccomandations=false;
    this.router.navigateByUrl("/voir-tout-metiers");
  }

  toggleMenu() {
    this.isMenuIconClicked = !this.isMenuIconClicked;
    this.isMenuIconClosed = !this.isMenuIconClosed;
  }

  onEnterKeyPressed(){
    this.searchService.setSearchQuery("");
    this.searchService.setFormationsQuery("");
    this.searchService.setMetiersQuery(this.query);
    this.router.navigateByUrl("/search-results")
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

  hideOverlay() {
    if (this.overlay && this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
        this.overlay = null; // Reset overlay reference
    }
  }
  
}
