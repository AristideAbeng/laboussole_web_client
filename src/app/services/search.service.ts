import { Injectable } from '@angular/core';
import { Faculte } from '../Models/faculte';
import { Metier } from '../Models/metier';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchQuery:string="";
  public formationQuery:string="";
  public metierQuery:string="";
  searchingCategory:boolean = false;
  public alreadyOnSearchPage:boolean = false;
  public showMetierReccomandations:boolean = false;
  public metierRecommandations:Array<Metier> = new Array();
  public showFormationsReccomandations:boolean = false;
  public formationsReccomandations:Array<Faculte> = new Array();

  private searchQuerySubject = new Subject<string>();

  constructor() { 
    
  }

  setSearchQuerye(query: string) {
    this.searchQuerySubject.next(query);
  }

  getSearchQuery() {
    return this.searchQuerySubject.asObservable();
  }

  setSearchQuery(s:string){
    this.searchQuery = s;
  }

  setFormationsQuery(s:string){
    this.formationQuery=s;
  }
  setMetiersQuery(s:string){
    this.metierQuery=s;
  }

}
