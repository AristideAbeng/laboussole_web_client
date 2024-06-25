import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-acceuil-option-box',
  templateUrl: './acceuil-option-box.component.html',
  styleUrls: ['./acceuil-option-box.component.scss']
})
export class AcceuilOptionBoxComponent {
  @Input() title: string = 'Click me';
  @Input() description: string = 'Click me';
  @Input() icon_name: string = 'menu.png';
  @Input() color: string = '5B72EE';
}
