import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageLoaderIdentifier } from '@core/Enums/page-loader-id.enum';
import { WidgetPercentageStatusEnum } from '@core/Enums/widget-percentage-status.enum';
import { TableComponentExtender } from '@core/component-classes/table-component.class';
import { TableComponentInterface } from '@core/component-interfaces/table-component.interface';
import { IWidget } from '@core/interfaces/widget.interface';
import { PRODUCTS } from '@core/mocks/products.mock';
import { LoaderService } from '@core/services/loader/loader.service';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';
import { PRODUCTS_LIMIT } from '@shared/constants/data-limit.const';
import { ProductStatusEnum } from '@store/enums/products-status.enum';
import { ProductFacade } from '@store/facades/products.facade';
import { IProduct } from '@store/models/product.model';

@Component({
  selector: 'mi-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent extends TableComponentExtender implements OnInit, TableComponentInterface, OnDestroy {
  
  activatedRoute = inject(ActivatedRoute);
  loaderService = inject(LoaderService);
  productFacade = inject(ProductFacade);

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
      headerLabel: 'Valor total na carteira',
      view_data: true,
      data: {
        main: 683000,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 68,
        footerLabelValue: 635,
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
        main: 872,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 55,
        footerLabelValue: 60,
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
        main: 298,
        percentageStatus: WidgetPercentageStatusEnum.DECREASE,
        percentageValue: 24,
        footerLabelValue: 40,
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
              this.selectedItems.push(element.id);
          });
      }
  }
  
  // End of Table Component Interface Requirements

  getProducts(page: number, limit: number){
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.PRODUCTS, true);
    this.productFacade.products(page, limit).subscribe({
      next: (incoming: IProduct[]) => {
        this.tableProducts = incoming;
        if(this.tableProducts.length > 0){

          this.itemsSelectionService.setItems = this.tableProducts;

          this.totalItems = PRODUCTS.length;
          this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.PRODUCTS, false);
        
        }else{
          this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.PRODUCTS);
        }
      },
    });
  }

}
