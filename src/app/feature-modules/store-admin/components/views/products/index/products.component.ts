import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { WidgetPercentageStatusEnum } from '@shared/Enums/widget-percentage-status.enum';
import { TableComponentExtender } from '@shared/component-classes/table-component.class';
import { TableComponentInterface } from '@shared/component-interfaces/table-component.interface';
import { IWidget } from '@shared/interfaces/widget.interface';
import { PRODUCTS } from '@core/mocks/products.mock';
import { LoaderService } from '@core/services/loader/loader.service';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';
import { PRODUCTS_LIMIT } from '@shared/constants/data-limit.const';
import { ProductStatusEnum } from '@store/enums/products-status.enum';
import { ProductFacade } from '@store/facades/products/products.facade';
import { IProduct, IProductResponse } from '@store/models/product.model';
import { StatisticsFacade } from '@store/facades/statistics.facade';
import { LookProductRelationService } from '@shared/services/look-product.service';

@Component({
  selector: 'mi-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent extends TableComponentExtender implements OnInit, TableComponentInterface, OnDestroy {
  
  activatedRoute = inject(ActivatedRoute);
  loaderService = inject(LoaderService);
  productFacade = inject(ProductFacade);
  statisticsFacade = inject(StatisticsFacade);
  private lookProductRelationshipService = inject(LookProductRelationService);

  constructor(){
    super();
    this.TABLE_STICKY_TOP = 100;
    this.checkbox = true;
    this.pagination = true;
    this.route = '/store/products';
    this.perPage = PRODUCTS_LIMIT;
    this.withImage = true;
    this.withTinyText = true;
    this.imageRadius = 'lg';
    this.placeholderCount = 5;
    this.totalItems = 0;
    this.currentPage = 1;
  }
  
  widgetPercentageStatusEnum = WidgetPercentageStatusEnum;
  widgets: IWidget[] = [
    {
      backgroundColor: 'black',
      ctaDotsColor: 'white',
      mainTextColor: 'white',
      footerTextColor: '#858585',
      svgIcon: {
        ref: SVGRefEnum.SHOPPING_CART,
        color: 'white'
      },
      headerLabel: 'Total de produtos',
      view_data: true,
      data: {
        main: 0,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 0,
        footerLabelValue: 0,
        footerLabelText: ' produtos adicionados'
      }
    },
    {
      backgroundColor: 'white',
      ctaDotsColor: '#858585',
      mainTextColor: 'black',
      footerTextColor: '#858585',
      svgIcon: {
        ref: SVGRefEnum.CHECK_CIRCLE,
        color: 'black'
      },
      headerLabel: 'Produtos Disponíves',
      view_data: true,
      data: {
        main: 0,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 0,
        footerLabelValue: 0,
        footerLabelText: ' produtos essa semana'
      }
    },
    {
      backgroundColor: 'white',
      ctaDotsColor: '#858585',
      mainTextColor: 'black',
      footerTextColor: '#858585',
      svgIcon: {
        ref: SVGRefEnum.MINUS_CIRCLE,
        color: 'black'
      },
      headerLabel: 'Produtos Indisponíveis',
      view_data: true,
      data: {
        main: 0,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 0,
        footerLabelValue: 0,
        footerLabelText: ' produtos essa semana'
      }
    },
  ];

  productStatusEnum = ProductStatusEnum;
  svgRefEnum = SVGRefEnum;

  tableHeader: string[] = ['Produto', 'Categoria', 'Quantidade', 'Data de Registro', 'Preço', 'Estado'];
  tableProducts: IProduct[] = [];

  pageLoaderIdentifier = PageLoaderIdentifier;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParam => {
      const pageParam = parseInt(queryParam.get('page') ?? '1');
      this.currentPage = pageParam;
      this.getProducts(pageParam, this.perPage);
    });
    this.generatePlaceholders();
    
    this.getWidgetsDatas();
  }

  // Start of Table Component Interface Requirements
  @ViewChild('theadElementRef') theadElementRef!: ElementRef<HTMLElement>;
  selectedDetailsStickyTopSpacing: number = 0;

  ngAfterViewInit(): void {
    this.selectedDetailsStickyTopSpacing = this.TABLE_STICKY_TOP + this.theadElementRef.nativeElement.clientHeight;
  }

  ngOnDestroy(): void {
    
  }

  toggleSelect(): void{
      if(this.selectedItems.length > 0){
          this.selectedItems = [];
          
      }else{
          this.tableProducts.forEach(element => {
              this.selectedItems.push(element);
          });
      }

      this.lookProductRelationshipService.attachProducts((this.selectedItems) as IProduct[]);
  }

  override selectItem(item: IProduct){
      let itemIndex: string | number = this.isSelected(item.id, 'index');
      if((typeof(itemIndex) === 'number') && itemIndex !== -1){
          this.selectedItems.splice(itemIndex, 1);
          return;
      }
      this.selectedItems.push(item);
      
      this.lookProductRelationshipService.attachProducts((this.selectedItems) as IProduct[]);
  }
  
  // End of Table Component Interface Requirements

  getWidgetsDatas(): void{
    this.allProductsCountWidget();
    this.availableProductsCountWidget();
    this.unavailableProductsCountWidget();
  }

  allProductsCountWidget(): void{
    const ALL_PRODUCTS_TOTAL_WIDGET_INDEX = 0;
    this.statisticsFacade.allProductsCount().subscribe(incoming => this.widgets[ALL_PRODUCTS_TOTAL_WIDGET_INDEX].data = { ...this.widgets[ALL_PRODUCTS_TOTAL_WIDGET_INDEX].data, ...incoming });
  }

  availableProductsCountWidget(): void{
    const AVAILABLE_PRODUCTS_TOTAL_WIDGET_INDEX = 1;
    this.statisticsFacade.availableProductsCount().subscribe(incoming => this.widgets[AVAILABLE_PRODUCTS_TOTAL_WIDGET_INDEX].data = { ...this.widgets[AVAILABLE_PRODUCTS_TOTAL_WIDGET_INDEX].data, ...incoming });
  }

  unavailableProductsCountWidget(): void{
    const UNAVAILABLE_PRODUCTS_TOTAL_WIDGET_INDEX = 2;
    this.statisticsFacade.unavailableProductsCount().subscribe(incoming => this.widgets[UNAVAILABLE_PRODUCTS_TOTAL_WIDGET_INDEX].data = { ...this.widgets[UNAVAILABLE_PRODUCTS_TOTAL_WIDGET_INDEX].data, ...incoming });
  }

  getProducts(page: number, limit: number){
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.PRODUCTS, true);
    this.productFacade.products(page, limit).subscribe({
      next: (incoming: IProductResponse) => {
        this.tableProducts = incoming.products;
        if(this.tableProducts.length > 0){

          this.itemsSelectionService.setItems = this.tableProducts;

          this.totalItems = incoming.total;
          this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.PRODUCTS, false);
        
        }else{
          this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.PRODUCTS);
        }
      },
    });
  }

}
