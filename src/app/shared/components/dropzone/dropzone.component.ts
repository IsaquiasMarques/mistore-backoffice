import { Component, Input } from '@angular/core';
import { DropzoneFunctionalities } from '@shared/component-classes/dropzone-functionalities.class';

@Component({
  selector: 'mi-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrl: './dropzone.component.css'
})
export class DropzoneComponent extends DropzoneFunctionalities {
  @Input({ required: true }) name: string = '';
  @Input() showDimentionsText: boolean = true;
}
