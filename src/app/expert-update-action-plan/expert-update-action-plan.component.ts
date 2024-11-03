import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expert-update-action-plan',
  templateUrl: './expert-update-action-plan.component.html',
  styleUrls: ['./expert-update-action-plan.component.scss']
})
export class ExpertUpdateActionPlanComponent {

  @Input() action_plan:any;

  constructor(){}
}
