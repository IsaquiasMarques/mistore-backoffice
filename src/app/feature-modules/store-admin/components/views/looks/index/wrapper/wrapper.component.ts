import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LOOKS_LIMT } from '@shared/constants/data-limit.const';
import { ILook } from '@store/models/looks.model';

@Component({
  selector: 'mi-look-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.css'
})
export class WrapperComponent implements OnChanges {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) currentPage: number = 1;
  
  @Input() totalItems: number = 0;
  @Input() limit: number = 0;
  
  @Input() looks: ILook[] = [];

  @Input() isLoading: boolean | null = false;

  @Input() pages: number[] = [];
  selectedItems: string[] = [];
  
  @Input() placeholderCount: number = 8;  

  ngOnChanges(changes: SimpleChanges): void {

  }

  generatePlaceholders(): number[]{
      return Array.from({ length: this.placeholderCount });
  }
}
