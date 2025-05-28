import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

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

  @Input() defaultValues: any[] = [];
  selectedItems: any[] = [];
  filteredItems: any[] = [];

  private changeDetectorRef = inject(ChangeDetectorRef);

  placeholderDisplay: string = '';

  selectSearchTerm: string = '';

  isSelectExpanded: boolean = false;
  maxHeightOfDropdown: number = 0;

  contentInitiated: boolean = false;

  @ViewChild('selectDropdownReference') selectDropdownReference!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.placeholderDisplay = this.placeholder;
    
    this.filteredItems = this.items;

    if(this.defaultValues.length > 0 && this.filteredItems.length > 0){
      this.defaultValues.forEach(element => {
        this.selectItem(element);
      });
    }

  }
  
  ngAfterViewInit(): void {
    
  }

  countItems(){
    const selectDropdownReference = document.querySelector(`.dropdown-${ this.name }`) as HTMLElement;
    if(!selectDropdownReference) return;
    for (let index = 0; index < selectDropdownReference.children.length; index++) {
      this.maxHeightOfDropdown += selectDropdownReference.children[index].clientHeight;
    }
  }

  toggleSelectVisibility(){
    if(!this.isSelectExpanded){
      this.expand();
      return;
    }
    this.collapse();
  }

  collapse(){
    this.isSelectExpanded = false;
    this.maxHeightOfDropdown = 0;
  }

  expand(){
    this.isSelectExpanded = true;
    this.countItems();
  }

  selectItem(item: any){
    let itemIndex = this.itemIndex(item[this.optionValue]);
    if(itemIndex === -1){
      if(this.multi){
        this.selectedItems = [...this.selectedItems, item];
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
