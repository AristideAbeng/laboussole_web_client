import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReccommendationsService {
 
  sys_rec_url = 'https://recommandationsystemlaboussole.onrender.com/'
  constructor(private http: HttpClient) {}

  getMetiersRecommendations(s:string,h?:string,c?:string,page?:number){
    return this.http.get(this.sys_rec_url + 'recommend_metiers/?centre_interet='+s+'&user_competence='+c+'&historique_recherche='+h+'&page='+page+'&page_size=100');
  }
  getFacultesReccomendations(s:string,p?:string,diplome?:string,page?:number){
    if(p){
      return this.http.get(this.sys_rec_url + 'recommandation_faculté/?centre_interet='+s+'&pays_user='+p+'&user_diplome='+diplome+'&page='+page+'&page_size=100');
    }
    return this.http.get(this.sys_rec_url + 'recommandation_faculté/?centre_interet='+s+'&pays_user=&user_diplome='+diplome+'&page='+page+'&page_size=100');
  }
}
