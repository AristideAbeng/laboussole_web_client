import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faq-template',
  templateUrl: './faq-template.component.html',
  styleUrls: ['./faq-template.component.scss']
})
export class FaqTemplateComponent {

  @Input() question:string = "what is your cancellation policy";
  @Input() answer:string = "You can now cancel an order when it is in packed/shipped status. Any amount paid will be credited into the same payment mode using which the payment was made";
  @Input() icon:string = "";

}
