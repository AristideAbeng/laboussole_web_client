import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-temoignage-template',
  templateUrl: './temoignage-template.component.html',
  styleUrls: ['./temoignage-template.component.scss']
})
export class TemoignageTemplateComponent {

  @Input() Name:string = "default";
  @Input() text:string = "default";
  @Input() date:string = "default";
  @Input() picture!:string | undefined;


}
