import { Component, HostListener } from '@angular/core';
import { Formations } from 'src/app/Models/formations';
import { Metier } from 'src/app/Models/metier';
import { OffreFormationService } from 'src/app/services/offre-formation.service';

@Component({
  selector: 'app-offre-etudes',
  templateUrl: './offre-etudes.component.html',
  styleUrls: ['./offre-etudes.component.scss']
})
export class OffreEtudesComponent {

  constructor(private service: OffreFormationService) {}


  isMenuIconClicked = false;
  isMenuIconClosed = true;
  showSearchBar = false;
  // formation!: Formations[];
  formations!: Metier[];
  // formations: any;
  showSideBar = false;

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
    this.getScreenWidth = window.innerWidth;
    // this.getScreenWidth <= 480? this.mobile = true : this.mobile = false;

    // this.service.getFormations().subscribe((data: any) => {
    //   this.formations = data.products;
    //   console.log(this.formations);
    // });
    // this.formations = this.service.getEtudes();
  }

  toggleMenu() {
    this.isMenuIconClicked = !this.isMenuIconClicked;
    this.isMenuIconClosed = !this.isMenuIconClosed;
  }

}
