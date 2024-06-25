import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-connexion-admin',
  templateUrl: './connexion-admin.component.html',
  styleUrls: ['./connexion-admin.component.scss']
})
export class ConnexionAdminComponent {
    hide:boolean = false;

    @Output() loginResult =  new EventEmitter<number>;

    notifyLoginResult(r:number):void{
      this.loginResult.emit(r);
    }
}
