import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-complete-profile-dialog',
  templateUrl: './complete-profile-dialog.component.html',
  styleUrls: ['./complete-profile-dialog.component.scss']
})
export class CompleteProfileDialogComponent {

  constructor(public dialogRef: MatDialogRef<CompleteProfileDialogComponent>){}

}
