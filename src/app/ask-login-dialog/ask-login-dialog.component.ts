import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions} from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-ask-login-dialog',
  templateUrl: './ask-login-dialog.component.html',
  styleUrls: ['./ask-login-dialog.component.scss']
})
export class AskLoginDialogComponent {

  constructor(public dialogRef: MatDialogRef<AskLoginDialogComponent>){

  }

}
