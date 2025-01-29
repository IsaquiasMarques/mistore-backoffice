import { Component, Input } from '@angular/core';
import { ILook } from '@store/models/looks.model';

@Component({
  selector: 'mi-look',
  templateUrl: './look.component.html',
  styleUrl: './look.component.css'
})
export class LookComponent {
  @Input({ required: true }) look!: ILook;
}
