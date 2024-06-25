import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-voyages-etudes-info-panel',
  templateUrl: './admin-voyages-etudes-info-panel.component.html',
  styleUrls: ['./admin-voyages-etudes-info-panel.component.scss']
})
export class AdminVoyagesEtudesInfoPanelComponent {
  @Input() selectedVoyageEtude:any;
}
