import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-temoignage-box',
  templateUrl: './temoignage-box.component.html',
  styleUrls: ['./temoignage-box.component.scss']
})
export class TemoignageBoxComponent {

  @Input() score: number = 3.5;
  @Input() image_url: string | undefined = ""
  @Input() name: string = "Name"
  @Input() description: string = "description";
  @Input() mail:string="";

  counterArray: number[] = new Array(5);

  

  constructor(private router:Router){
   
  }

  viewTemoignage(){
    this.router.navigateByUrl("/temoignages/"+this.mail)
  }
}
