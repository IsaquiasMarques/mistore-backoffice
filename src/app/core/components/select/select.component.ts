import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'mi-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() label: string = 'Label';
  @Input() name: string = 'label';
  @Input() items!: any[];
  @Input() optionValue!: string;
  @Input() optionName!: string;
  @Input() placeholder!: string;
  @Input() multi: boolean = false;

  @Output() selectedItemsEventEmitter: EventEmitter<any[]> = new EventEmitter<any[]>();

  selectedItems: any[] = [];
  filteredItems: any[] = [];

  placeholderDisplay: string = '';

  selectSearchTerm: string = '';

  isSelectExpanded: boolean = false;
  maxHeightOfDropdown: number = 0;

  @ViewChild('selectDropdownReference') selectDropdownReference!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.placeholderDisplay = this.placeholder;
    this.filteredItems = this.items;
  }

  ngAfterViewInit(): void {
    for (let index = 0; index < this.selectDropdownReference.nativeElement.children.length; index++) {
      this.maxHeightOfDropdown += this.selectDropdownReference.nativeElement.children[index].clientHeight;
    }
  }

  toggleSelectVisibility(){
    this.isSelectExpanded = !this.isSelectExpanded;
  }

  collapse(){
    this.isSelectExpanded = false;
  }

  expand(){
    this.isSelectExpanded = true;
  }

  selectItem(item: any){
    let itemIndex = this.itemIndex(item[this.optionValue]);
    if(itemIndex === -1){
      if(this.multi){
        this.selectedItems.push(item);
      }else{
        this.selectedItems = [item];
        this.collapse();
      }
    }else{ 
      this.selectedItems.splice(itemIndex, 1);
    }

    this.inputPlaceholderContentChange();
    this.selectedItemsEventEmitter.emit(this.selectedItems);
  }

  itemIndex(itemValue: any): number{
    return this.selectedItems.findIndex(item => item[this.optionValue] === itemValue);
  }

  searchItem(): void{
    if(this.selectSearchTerm.length !== 0){
      this.filteredItems = this.items.filter(item => item[this.optionName].toLowerCase().includes(this.selectSearchTerm.toLocaleLowerCase()));
    }else{
      this.filteredItems = this.items;
    }
  }

  inputPlaceholderContentChange(){
    let getItemsNames: string[] = [];
    this.selectedItems.forEach(item => {
      getItemsNames.push(item[this.optionName]);
    });
    let joined = getItemsNames.join(', ');
    if(getItemsNames.length > 0){
      this.placeholderDisplay = joined;
    }else {
      this.placeholderDisplay = this.placeholder;
    }
  }

}
