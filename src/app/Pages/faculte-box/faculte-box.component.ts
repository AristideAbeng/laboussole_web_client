import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Faculte } from 'src/app/Models/faculte';

@Component({
  selector: 'app-faculte-box',
  templateUrl: './faculte-box.component.html',
  styleUrls: ['./faculte-box.component.scss']
})
export class FaculteBoxComponent {
  @Input() faculte!: Faculte;
  @Output() id = new EventEmitter<number>()

  onClick(faculte_id: number){
    this.id.emit(faculte_id)
  }
}
