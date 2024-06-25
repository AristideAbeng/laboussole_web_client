import { Injectable } from '@angular/core';
import { Temoignage } from '../Models/temoignage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemoignageService {

  private root_url:string='https://laboussole-back-end.onrender.com/temoignages/';
  private view_Url:string='';


  constructor(private httpClient: HttpClient) { }

  getTemoignages(): Observable<any> {
    return this.httpClient.get(this.root_url);
  }

  postTemoignage(temoignage:Temoignage){
    return this.httpClient.post(this.root_url,{
      "nom":temoignage.nom,
      "telephone":temoignage.telephone,
      "contenu":temoignage.contenu,
      "profession":temoignage.profession
    })
  }

  def_temoignage_1:Temoignage = {
    'nom': 'ATANGANA Prince',
    'contenu': 'Lorsque j’ai eu mon baccalauréat A4Esp l’année dernière au lycée Classique et Moderne de Sangmélima je ne savais même pas qu’on pouvait faire une école pour être comptable avec un BAC A c’est ainsi que j’ai découvert grâce a LABOUSSOLE que c’était possible et j’ai fais le concours de l’IUT de Douala pour la filière GAPMO et j’ai réussi/',
    telephone: '',
    profession: '',
    tem_name:"",
    tem_photo:""
  }

  def_temoignage_2:Temoignage = {
    'nom': 'TCHOUPE MEGHANE',
    'contenu': 'J’ai eu mon probatoire D l’année dernière et à chaque fois pendant les vacances mon père me demandais déjà de lui dire ce que j’allais faire après le BAC et c’est la que j’ai découvert LABOUSSOLE et aujourd’hui je sais que je veux être Ingénieur agronome et me former à la FASA de Dschang',
    telephone: '',
    profession: '',
    tem_name:"",
    tem_photo:""
  }
  def_temoignage_3:Temoignage = {
    'nom': 'TIZI Joel',
    'contenu': 'Grâce à LABOUSSOLE j’ai découvert qu’il y’a déjà l’ESSEC ici à Garoua et je compte bien faire le concours cette année et le réussir.',
    telephone: '',
    profession: '',
    tem_name:"",
    tem_photo:""
  }

  list_temoignages:Temoignage[] = [
    this.def_temoignage_1,this.def_temoignage_2,this.def_temoignage_3
  ]

  
}
