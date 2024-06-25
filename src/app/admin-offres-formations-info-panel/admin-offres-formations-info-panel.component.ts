import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-admin-offres-formations-info-panel',
  templateUrl: './admin-offres-formations-info-panel.component.html',
  styleUrls: ['./admin-offres-formations-info-panel.component.scss']
})
export class AdminOffresFormationsInfoPanelComponent {

  @Input() selectedFormation:any;

  

}
