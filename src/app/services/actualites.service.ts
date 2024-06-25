import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActualitesService {

  private root_url:string='https://laboussole-back-end.onrender.com/actualites/';

  public currentArticleId:number=0;
  constructor(private httpClient: HttpClient) {
   }

   getAllArticles(){
    return this.httpClient.get(this.root_url);
   }
   getArticleById(id:number){
    return this.httpClient.get(this.root_url+id+'/');
   }
   setCurrentArticle(id:number){
    this.currentArticleId=id;
   }
}
