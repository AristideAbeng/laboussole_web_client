import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-round-button',
  templateUrl: './custom-round-button.component.html',
  styleUrls: ['./custom-round-button.component.scss']
})
export class CustomRoundButtonComponent {
  @Input() title: string = 'Click me';
}
