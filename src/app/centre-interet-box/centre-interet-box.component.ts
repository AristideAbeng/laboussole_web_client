import { Component,Input,EventEmitter, Output} from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-centre-interet-box',
  templateUrl: './centre-interet-box.component.html',
  styleUrls: ['./centre-interet-box.component.scss']
})
export class CentreInteretBoxComponent {

  @Input() text_val:string="default";
  @Input() id:Number = 0;
  @Output() eventEmitter = new EventEmitter<string>();
  clicked:boolean = false;

  constructor(private userService:UserServiceService){
    
  }

  ngOnInit(){
    if(this.userService.user_email){
      if(this.userService.centres_interets.indexOf(this.text_val) !== -1){
        this.changeState();
      }
    }
  }

  changeState(){
    this.clicked = ! this.clicked;
    this.eventEmitter.emit(this.text_val);
  }
}
