import { Component, OnInit } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { Faculte } from '../Models/faculte';
import { Metier } from '../Models/metier';
import { Universite } from '../Models/universite';
import { OffreFormationService } from '../services/offre-formation.service';
import { SearchService } from '../services/search.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { UserServiceService } from '../services/user-service.service';
import { UserInfo } from '../Models/userInfo';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {


  defaultMetier:Metier=new Metier("1","fads","dfdasf","afds","afds","dsaf","dfas","dsfa","dsaf","dfsa","adfs","saA","ASDSAD","asdsa");
  
  resultatsEcoles:Array<Faculte>=new Array()
  resultatsMetiers:Array<Metier>=new Array()
  resultatsUniversites:Array<Universite>=new Array()
  query:string="";

  count_metiers:number | null=0;
  next_link_metiers:string | null ="";

  showSpinner:boolean = false;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(private searchService:SearchService,
    private formationService:OffreFormationService,
    private userService:UserServiceService,
    private router:Router
    ){

  }
  ngDoCheck(){
    window.scrollTo(0,0);
  }
  ngOnInit(){
    window.scrollTo(0,0)

    console.log(this.searchService.searchQuery);
    console.log(this.searchService.formationQuery);
    console.log(this.searchService.metierQuery);

    this.searchService.getSearchQuery().subscribe(query => {
      this.userService.getUserInfo().subscribe(
        (data:any)=>{
          let us:UserInfo = data as UserInfo;
          const currentDate: Date = new Date();
         // console.log("----------------USER INFO ARRIVED-----------------")

          // Convert the Date object to a string
          const currentDateTimeString: string = currentDate.toISOString();
          this.formationService.saveHistorique(us.id,currentDateTimeString,this.searchService.searchQuery).subscribe(
            (data:any)=>{
              //console.log("----------------RESULT ARRIVED-----------------")
              //console.log(data);
            }
          )
        }
      )
      
      this.query = this.searchService.searchQuery 
      this.showSpinner = true;
      this.formationService.searchEcoles(this.searchService.searchQuery).subscribe(
        (data:any)=>{
          this.showSpinner=false;
          //console.log("*******LOGGING ECOLES***************");
          //console.log(data);
          this.resultatsEcoles=data as Array<Faculte>;

        }
      );
      this.formationService.searchMetiers(this.searchService.searchQuery).subscribe(
        (data:any)=>{
          this.showSpinner=false;
          //console.log("*******LOGGING METIERS***************");
          //console.log(data);
          this.resultatsMetiers = data.results as Array<Metier>;
          if(data.results){
            this.next_link_metiers=data.next;
            this.count_metiers=data.count;
          }
        }
      );
      this.formationService.searchUniversites(this.searchService.searchQuery).subscribe(
        (data:any)=>{
          this.showSpinner=false;
         // console.log("*******LOGGING UNIVERSITES***************");
          //console.log(data);
          this.resultatsUniversites = data as Array<Universite>;
        }
      );
        
    });

    if(this.searchService.searchQuery != ""){
      this.query = this.searchService.searchQuery 
      this.showSpinner = true;
      this.formationService.searchEcoles(this.searchService.searchQuery).subscribe(
        (data:any)=>{
          this.showSpinner=false;
          //console.log("*******LOGGING ECOLES***************");
          //console.log(data);
          this.resultatsEcoles=data as Array<Faculte>;

        }
      );
      this.formationService.searchMetiers(this.searchService.searchQuery).subscribe(
        (data:any)=>{
          this.showSpinner=false;
          //console.log("*******LOGGING METIERS***************");
          //console.log(data);
          this.resultatsMetiers = data.results as Array<Metier>;
          if(data.results){
            this.next_link_metiers=data.next;
            this.count_metiers=data.count;
          }
        }
      );
      this.formationService.searchUniversites(this.searchService.searchQuery).subscribe(
        (data:any)=>{
          this.showSpinner=false;
          //console.log("*******LOGGING UNIVERSITES***************");
          //console.log(data);
          this.resultatsUniversites = data as Array<Universite>;
        }
      );

    }else if(this.searchService.formationQuery != ""){
      (data:any)=>{
        let us:UserInfo = data as UserInfo;
        const currentDate: Date = new Date();

        // Convert the Date object to a string
        const currentDateTimeString: string = currentDate.toISOString();
        this.formationService.saveHistorique(us.id,currentDateTimeString,this.searchService.formationQuery).subscribe(
          (data:any)=>{
            //console.log(data);
          }
        )
      }
      this.showSpinner=true;
      this.query = this.searchService.formationQuery
      this.formationService.searchEcoles(this.searchService.formationQuery).subscribe(
        (data:any)=>{
          this.showSpinner=false;
          //console.log(data);
          this.resultatsEcoles = data;
        }
      )
      this.formationService.searchUniversites(this.searchService.searchQuery).subscribe(
        (data:any)=>{
          this.showSpinner=false;
          //console.log(data);
          this.resultatsUniversites = data;
        }
      )
    }else if(this.searchService.metierQuery != ""){
      (data:any)=>{
        let us:UserInfo = data as UserInfo;
        const currentDate: Date = new Date();

        // Convert the Date object to a string
        const currentDateTimeString: string = currentDate.toISOString();
        this.formationService.saveHistorique(us.id,currentDateTimeString,this.searchService.metierQuery).subscribe(
          (data:any)=>{
            //console.log(data);
          }
        )
      }
      this.showSpinner=true;
      this.query = this.searchService.metierQuery
      this.formationService.searchMetiers(this.searchService.metierQuery).subscribe(
        (data:any)=>{
          this.showSpinner=false;
          //console.log(data);
          this.resultatsMetiers = data.results as Array<Metier>;
          if(data.results){
            this.next_link_metiers=data.next;
            this.count_metiers=data.count;
          }
        }
      )
    }
  }

  navigateToDetailsMetier(id:string){
    this.router.navigate(['/metiers',id]);
  }
  navigateToDetailsUniversite(id:number){
    this.router.navigate(['/universites', id]); 
  }
  navigateToDetailsEcole(id:number){
    this.router.navigate(['/facultes/',id]);
  }

  ngOnDestroy(){
    this.searchService.alreadyOnSearchPage=false;
  }
}
