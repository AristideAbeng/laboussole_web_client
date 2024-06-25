import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-admin-bourse-etude-info-panel',
  templateUrl: './admin-bourse-etude-info-panel.component.html',
  styleUrls: ['./admin-bourse-etude-info-panel.component.scss']
})
export class AdminBourseEtudeInfoPanelComponent {
  @Input() selectedBourse:any;
}
