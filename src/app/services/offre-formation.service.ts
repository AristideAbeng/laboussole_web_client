import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OffreFormationService {
  constructor(private http: HttpClient) {}
  // url = 'https://dummyjson.com';
  url = 'https://laboussole-back-end.onrender.com';
  

  getFormations() {
    return this.http.get(this.url + '/metiers/');
  }
  getFormationsPage(p:string){
    return this.http.get(p);
  }
  searchMetiers(s:string){
    return this.http.get(this.url + '/metiers/?search='+s);
  }
  getMetiersRecommendations(s:string){
    return this.http.get(this.url + '/metiers/reccomendations/?search='+s);
  }
  getMetierDetails(id: any) {
    return this.http.get(this.url + '/metiers/' + id + '/');
  }
  getMetiersLinkedToFaculte(id: any) {
    return this.http.get(this.url + '/metiers/facultesdebouches/' + id + '/');
  }
  getMetiersLinkedToFiliere(id: any) {
    return this.http.get(this.url + '/metiers/filieresdebouches/' + id + '/');
  }
  getUniversites() {
    return this.http.get(this.url + '/universites/');
  }
  searchUniversites(s:string){
    return this.http.get(this.url + '/universites/?search='+s);
  }
  getUniversiteDetails(id: any) {
    return this.http.get(this.url + '/universites/' + id + '/');
  }
  getFaculteUniv(id: any) {
    return this.http.get(this.url + '/facultes/universites/' + id + '/');
  }
  getFacultes(id: any) {
    return this.http.get(this.url + '/facultes/' + id + '/');
  }
  searchEcoles(s:string){
    return this.http.get(this.url + '/facultes/?search='+s);
  }
  getFacultesReccomendations(s:string,p?:string){
    if(p){
      return this.http.get(this.url + '/facultes/reccomendations/?search='+s+'&pays='+p);
    }
    return this.http.get(this.url + '/facultes/reccomendations/?search='+s);
  }
  getPageEcole(url:string){
    return this.http.get(url);
  }
  getFiliereFac(id: number) {
    return this.http.get(this.url + '/filieres/faculte/' + id + '/');
  }
  getFiliereFacMaster(id: number) {
    return this.http.get(this.url + '/filieres/faculte/' + id + '/' + 5 + '/');
  }
  getFilieres() {
    return this.http.get(this.url + '/filieres/');
  }
  getSimilarFilieres(name:string) {
    return this.http.get(this.url + '/filieres/?name='+name);
  }
  getFiliereDetails(id: any) {
    return this.http.get(this.url + '/filieres/' + id + '/');
  }
  saveHistorique(id_user:number,date:string,mots_cles:string){
    let url = this.url+'/historique_recherches/';
    return this.http.post(url,{
      "id_utilisateur":id_user,
      "date_heure":date,
      "mots_cles":mots_cles
    })
  }





















  getFormation() {
    return [
      {
        image: 'assets/compter-eng-box.jpeg',
        title: 'Ingénieur informaticien',
        description:
          "L'ingénieur informaticien conçoit, développe, et met en place des solutions informatiques pour répondre aux besoins des entreprises et des organisations. ",
      },
      {
        image: 'assets/medical-doc-box.jpeg',
        title: 'Medecin',
        description:
          "Le médecin est un professionnel de la santé qui diagnostique et traite les maladies et les blessures. Il s' occupe de la prévention, du suivi et de la réadaptation des patients.",
      },
      {
        image: 'assets/civil-engineer.jpg',
        title: 'Ingénieur de Génie Civil',
        description:
          "L'ingénieur en génie civil est un professionnel qui conçoit, calcule, et supervise la construction d'infrastructures telles que des ponts, des routes, des bâtiments, des tunnels, etc.",
      },
      {
        image: 'assets/image4.png',
        title: 'Enseignant de Langue et Littérature',
        description:
          'Le professeur de français a pour mission principale de transmettre sa passion de la langue et de la lit...',
      },
      {
        image: 'assets/image4.png',
        title: 'Redacteur, Editeur',
        description:
          "Le rédacteur est un professionnel de l'écriture qui crée du contenu textuel pour divers supports, tels que...",
      },
      {
        image: 'assets/image4.png',
        title: 'Assistant de direction',
        description:
          "Il joue un rôle crucial dans l'organisation administrative et la gestion quotidienne des tâches, per...",
      },
      {
        image: 'assets/image2.png',
        title: "Juriste d'entreprise",
        description:
          "Le juriste d'entreprise est un véritable conseiller juridique au sein d'une société. Il intervient dan...",
      },
      {
        image: 'assets/image2.png',
        title: 'Avocat',
        description:
          "L'avocat est un professionnel du droit qui conseille et défend ses clients dans le cadre de litiges ou de ...",
      },
    ];
  }

  getEtudes() {
    return [
      {
        image: 'assets/image4.png',
        title:
          'Bourse et programme d’échange éducatifs pour le développement CANADA-ANASE',
        description:
          "L'initiative Bourses et programmes d’échanges éducationnels pour le développement Canada- ANASE permet aux étudiants, des pays membres de l’Association des Nations de l'Asie du Sud-Est (l’ANASE), de participer à des échanges d’études.",
      },
      {
        image: 'assets/image4.png',
        title:
          'Bourse et programme d’échange éducatifs pour le développement CANADA-ANASE',
        description:
          "L'initiative Bourses et programmes d’échanges éducationnels pour le développement Canada- ANASE permet aux étudiants, des pays membres de l’Association des Nations de l'Asie du Sud-Est (l’ANASE), de participer à des échanges d’études.",
      },
      {
        image: 'assets/image2.png',
        title:
          'Bourse et programme d’échange éducatifs pour le développement CANADA-ANASE',
        description:
          "L'initiative Bourses et programmes d’échanges éducationnels pour le développement Canada- ANASE permet aux étudiants, des pays membres de l’Association des Nations de l'Asie du Sud-Est (l’ANASE), de participer à des échanges d’études.",
      },
      {
        image: 'assets/image3.png',
        title:
          'Bourse et programme d’échange éducatifs pour le développement CANADA-ANASE',
        description:
          "L'initiative Bourses et programmes d’échanges éducationnels pour le développement Canada- ANASE permet aux étudiants, des pays membres de l’Association des Nations de l'Asie du Sud-Est (l’ANASE), de participer à des échanges d’études.",
      },
      {
        image: 'assets/image3.png',
        title:
          'Bourse et programme d’échange éducatifs pour le développement CANADA-ANASE',
        description:
          "L'initiative Bourses et programmes d’échanges éducationnels pour le développement Canada- ANASE permet aux étudiants, des pays membres de l’Association des Nations de l'Asie du Sud-Est (l’ANASE), de participer à des échanges d’études.",
      },
    ];
  }
}
