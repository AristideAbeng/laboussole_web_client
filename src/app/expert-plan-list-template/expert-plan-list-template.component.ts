import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-expert-plan-list-template',
  templateUrl: './expert-plan-list-template.component.html',
  styleUrls: ['./expert-plan-list-template.component.scss']
})
export class ExpertPlanListTemplateComponent {

  @Input() plan_action:any;
  @Output() onActionPlanclicked = new EventEmitter<any>();

  showPlan(){
    this.onActionPlanclicked.emit(this.plan_action)
    console.log("emitted plan")
    console.log(this.plan_action)
  }
}
