import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-plan-action-list',
  templateUrl: './plan-action-list.component.html',
  styleUrls: ['./plan-action-list.component.scss']
})
export class PlanActionListComponent {
  readonly panelOpenState = signal(false);

  @Output() backToActionList = new EventEmitter<any>();
  @Input()
  action_plan!: any[];
  detailed_action_plan!:any[];
  has_plan:boolean = false;

  constructor(){

  }

  ngAfterViewInit(){
    if(this.action_plan){
      console.log("logging.....Action Plans")
      console.log(this.action_plan)
      this.detailed_action_plan = this.action_plan[0].actions
      console.log("action plan size ",this.action_plan.length)
      if(this.action_plan.length > 0){
        this.has_plan = false;
      }
    }
  }

  signalBackToList(){
    this.backToActionList.emit("");
  }
}
