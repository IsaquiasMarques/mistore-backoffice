import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { PageLoaderIdentifier } from '@core/Enums/page-loader-id.enum';
import { LoaderService } from '@core/services/loader/loader.service';
import { IProduct } from '@store/models/product.model';

@Component({
  selector: 'mi-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  
  TABLE_STICKY_TOP: number = 100;
  loaderService = inject(LoaderService);
  pageLoaderIdentifier = PageLoaderIdentifier;

  @Input() tableData: IProduct[] = [];
  @Input() tableHeader: string[] = [];
  @Input() checkbox: boolean = true;
  @Input() pagination: boolean = true;
  @Input() perPage: number = 4;
  @Input() withImage: boolean = true;
  @Input() withTinyText: boolean = true;
  @Input() imageRadius: 'lg' | 'full' = 'lg';
  @Input() placeholderCount: number = 6;
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;

  @Output() gotoPage: EventEmitter<number> = new EventEmitter<number>();

  pages: number[] = [];

  selectedItems: string[] = [];

  @ViewChild('theadElementRef') theadElementRef!: ElementRef<HTMLElement>;
  selectedDetailsStickyTopSpacing: number = 0;

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculatePages();
  }

  ngAfterViewInit(): void {
    this.selectedDetailsStickyTopSpacing = (this.TABLE_STICKY_TOP + this.theadElementRef.nativeElement.clientHeight)
  }

  selectItem(itemId: string){
    console.log(itemId)
    let itemIndex: string | number = this.isSelected(itemId, 'index');
    if((typeof(itemIndex) === 'number') && itemIndex !== -1){
      this.selectedItems.splice(itemIndex, 1);
      return;
    }
    this.selectedItems.push(itemId);
  }

  isSelected(itemId: string, returningString: 'checked' | 'index'): string | number{
    let itemIndexOnSelection = this.selectedItems.findIndex(item => item === itemId);
    
    switch(returningString){
      case 'checked':
        return (itemIndexOnSelection !== -1) ? 'checked' : '';
      case 'index':
        return itemIndexOnSelection;
      default:
        return itemIndexOnSelection;
    }
  }

  toggleSelect(): void{
    if(this.selectedItems.length > 0){
      this.selectedItems = [];
      
    }else{
      this.tableData.forEach(element => {
        this.selectedItems.push(element.id);
      });
    }
  }

  calculatePages(){
    let pagesCount = 0;
    let remain = this.totalItems % this.perPage;

    if(remain === 0){
      pagesCount = Math.floor(this.totalItems / this.perPage);

    }else{
      pagesCount = Math.floor(this.totalItems / this.perPage) + 1;
    }

    for (let index = 1; index <= pagesCount; index++) {
      let page = this.pages.find(item => item === index);
      if(!page){
        this.pages.push(index);
      }else{
        return;
      }
    }

  }

  generatePlaceholders(): number[]{
    return Array.from({ length: this.placeholderCount });
  }
}
