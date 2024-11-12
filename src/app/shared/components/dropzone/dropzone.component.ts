import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropzoneFunctionalities } from '@shared/component-classes/dropzone-functionalities.class';

@Component({
  selector: 'mi-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrl: './dropzone.component.css'
})
export class DropzoneComponent extends DropzoneFunctionalities {
  @Input({ required: true }) name: string = '';
  @Input() showDimentionsText: boolean = true;
  @Input() previewFileUrls: boolean = false;
  @Output() filePreviewUrl: EventEmitter<any[]> = new EventEmitter<any[]>();

  emit(): void{
    if(!this.previewFileUrls) return;
    this.filePreviewUrl.emit(this.files);
  }
}
