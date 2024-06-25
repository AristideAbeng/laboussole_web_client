import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Metier } from 'src/app/Models/metier';
import { OffreFormationService } from 'src/app/services/offre-formation.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-voir-tous-metiers',
  templateUrl: './voir-tous-metiers.component.html',
  styleUrls: ['./voir-tous-metiers.component.scss']
})
export class VoirTousMetiersComponent {

  constructor(
    private service: OffreFormationService,
    private router: Router,
    private route: ActivatedRoute,
    private searchService:SearchService
  ) {}

  previousPage!:string;
  nextPage!:string;
  count!:number;

  query:string = "";

  isMenuIconClicked = false;
  isMenuIconClosed = true;
  showSearchBar = false;
  // formation!: Formations[];
  metiers!: Metier[];
  // formations: any;
  showSideBar = false;
  showingRecs:boolean=false;

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
    window.scrollTo(0,0);
    this.getScreenWidth = window.innerWidth;
    // this.getScreenWidth <= 480? this.mobile = true : this.mobile = false;

    if(this.searchService.showMetierReccomandations){

        this.metiers = this.searchService.metierRecommandations;
        this.showingRecs=true;

    }else{
      this.service.getFormations().subscribe((data: any) => {
        //console.log(data);
        this.metiers = data.results;
        this.previousPage = data.previous;
        this.nextPage = data.next;
        this.count = data.count;
        
      });
    }

   


   
  }
  fetchPage(s:string){
    this.service.getFormationsPage(s).subscribe(
      (data:any)=>{
        this.metiers = data.results;
        this.previousPage = data.previous;
        this.nextPage = data.next;
        this.count = data.count;
        window.scrollTo(0,0);
      }
    )
  }
  navigateToDetails(itemId: string) {
    this.router.navigate(['/metiers', itemId]); // Navigate to details route with item ID
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
}
