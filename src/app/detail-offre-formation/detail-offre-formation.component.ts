import { Component } from '@angular/core';
import { Metier } from '../Models/metier';
import { ActivatedRoute } from '@angular/router';
import { OffreFormationService } from '../services/offre-formation.service';
import { map } from 'rxjs';
import { FiliereFormation } from '../Models/filiere-formation';
import { Faculte } from '../Models/faculte';
import { Universite } from '../Models/universite';

@Component({
  selector: 'app-detail-offre-formation',
  templateUrl: './detail-offre-formation.component.html',
  styleUrls: ['./detail-offre-formation.component.scss'],
})
export class DetailOffreFormationComponent {
  isMenuIconClicked = false;
  isMenuIconClosed = true;
  showSearchBar = false;

  // about service
  metierId!: any;
  metierItem!: Metier;
  competences!: string[];
  missions!: string[];
  linked_filiere!:FiliereFormation;
  linked_faculte!:Faculte;
  lieu:Map<string,string> = new Map();
  constructor(
    private metierRoute: ActivatedRoute,
    private service: OffreFormationService
  ) {}

  ngOnInit() {
    this.metierId = this.metierRoute.snapshot.paramMap.get('id_metiers'); // Get cart item ID from route
    console.log(this.metierId);

    if (this.metierId) {
      this.service
        .getMetierDetails(this.metierId)
        .subscribe((response: any) => {
          console.log("returned with metier details")
          // console.log(response);
          this.metierItem = response;
          this.competences = this.metierItem.competencescles.split(',');
          this.missions = this.metierItem.principales_missions.split(',');
          console.log(this.metierItem);
          console.log(this.competences);
          this.service.getFiliereDetails(this.metierItem.filieres).subscribe(
            (data:any) =>{
              console.log("fetched for filiere")
              console.log(data);
              this.linked_filiere = data as FiliereFormation;



              this.service.getFacultes(this.linked_filiere.faculte).subscribe(
                (data:any)=>{
                  console.log("fetched faculte");
                  console.log(data)
                  this.linked_faculte = data as Faculte;
                }
              )

              this.service.getSimilarFilieres(this.linked_filiere.nom).subscribe(
                (data)=>{
                  console.log(data);
                  let a:Array<FiliereFormation> = data as Array<FiliereFormation>;

                  for(let fil of a){
                    console.log(fil)
                    this.service.getFacultes(fil.faculte).subscribe(
                      (data:any)=>{
                        
                        let f = data as Faculte;
                        console.log(f)
                        this.lieu.set(f.nom,"");

                        this.service.getUniversiteDetails(f.universite).subscribe(
                          (data:any)=>{
                            let u = data as Universite;
                            console.log(u);
                            this.lieu.set(f.nom,u.nom);
                          }
                        )

                      }
                    )
                  }
                }
              )

            }
          )

        
        });
    }

    // this.metierItem = this.service.getCartItemById(this.metierId); // Retrieve specific cart item details
  }

  //aside
  toggleMenu() {
    this.isMenuIconClicked = !this.isMenuIconClicked;
    this.isMenuIconClosed = !this.isMenuIconClosed;
  }

  handleClick(sectionId: string){
    document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth'})
  }
}
