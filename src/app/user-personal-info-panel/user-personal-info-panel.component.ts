import { Component, Input } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-personal-info-panel',
  templateUrl: './user-personal-info-panel.component.html',
  styleUrls: ['./user-personal-info-panel.component.scss']
})
export class UserPersonalInfoPanelComponent {

  @Input() selectedUser:any;
  value:string= 'default';
}
