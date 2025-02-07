import { AfterViewInit, Component, computed, ElementRef, inject, OnInit, Signal, signal, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AlertService, LogStatus } from '@core/services/alert/alert.service';
import { LoaderService } from '@core/services/loader/loader.service';
import { TableComponentExtender } from '@shared/component-classes/table-component.class';
import { PRODUCTS_LIMIT } from '@shared/constants/data-limit.const';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';
import { LookProductRelationService } from '@shared/services/look-product.service';
import { ProductStatusEnum } from '@store/enums/products-status.enum';
import { LookFacade } from '@store/facades/looks/look.facade';
import { ProductFacade } from '@store/facades/products/products.facade';
import { IProduct, IProductResponse } from '@store/models/product.model';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'mi-edit-look',
  templateUrl: './edit-look.component.html',
  styleUrl: './edit-look.component.css'
})
export class EditLookComponent extends TableComponentExtender implements OnInit, AfterViewInit {
  
  constructor(){
    super();
    this.TABLE_STICKY_TOP = 0;
    this.checkbox = true;
    this.pagination = true;
    this.route = './';
    this.perPage = PRODUCTS_LIMIT;
    this.withImage = true;
    this.withTinyText = true;
    this.imageRadius = 'lg';
    this.placeholderCount = 5;
    this.totalItems = 0;
    this.currentPage = 1;
  }
  
  public loaderService = inject(LoaderService);
  public pageLoaderIdentifier = PageLoaderIdentifier;
  public selectedProducts$: Signal<IProduct[]> = computed(() => this.lookProductRelationshipService.selectedProductsToAttachOnNewLook$());

  private lookFacade = inject(LookFacade);
  private productFacade = inject(ProductFacade);
  private lookProductRelationshipService = inject(LookProductRelationService);

  private alertService = inject(AlertService);
  private activatedRoute = inject(ActivatedRoute);

  selectedLookImages: any[] = [];

  editLookFormGroup!: FormGroup;

  isEditing = signal(false);

  showProductsModal = signal(false);

  productStatusEnum = ProductStatusEnum;
  svgRefEnum = SVGRefEnum;

  tableHeader: string[] = ['Produto', 'Categoria', 'Quantidade', 'Data de Registro', 'Preço', 'Estado'];
  tableProducts: IProduct[] = [];

  ngOnInit(): void {
    this.editLookFormGroup = new FormGroup({
      'title': new FormControl('', [ Validators.required, Validators.maxLength(30) ]),
      'description': new FormControl('', [ Validators.required, Validators.maxLength(30) ])
    })

    combineLatest([this.activatedRoute.paramMap, this.activatedRoute.queryParamMap])
    .subscribe(([params, queryParams]) => {

      const id = params.get('id') ?? null;

      if(!id) return;
      this.getTheLook(id);

      const productsListingActivePage = queryParams.get('product_modal_page');
      if(productsListingActivePage){
        this.currentPage = parseInt(productsListingActivePage);
        this.getProducts(this.currentPage, PRODUCTS_LIMIT);
      }
    });
  }

  selectedDetailsStickyTopSpacing: number = 0;

  ngAfterViewInit(): void {
    this.selectedDetailsStickyTopSpacing = this.TABLE_STICKY_TOP + 52;
  }

  toggleSelect(): void{
      if(this.selectedItems.length > 0){
        this.unselectAll();
      }else{
          this.tableProducts.forEach(element => {
              this.selectedItems.push(element);
          });
      }

      this.lookProductRelationshipService.attachProducts((this.selectedItems) as IProduct[]);
  }

  cancel(): void{
    this.changeProductsModalVisibility(false);
    this.unselectAll();
    this.lookProductRelationshipService.attachProducts(this.selectedItems);
  }

  save(): void{
    this.changeProductsModalVisibility(false);
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

  changeProductsModalVisibility(status: boolean): void{
    if(status){
      this.getProducts(this.currentPage, PRODUCTS_LIMIT);
    }
    this.showProductsModal.set(status);
  }

  getTheLook(id: string): void{
    this.lookFacade.look(id).subscribe({
      next: incoming => {
        console.log(incoming);
      },
      error: error => {
        console.error(error);
        this.alertService.add(error.message, LogStatus.ERROR);
      }
    })
  }

  submit(): void{
    if(this.editLookFormGroup.invalid) return;
    if(!(this.selectedProducts$().length > 0)){
      this.alertService.add("Seleccione os produtos para criar o look", LogStatus.ERROR)
      return;
    };

    if(!(this.selectedLookImages.length > 0)){
      this.alertService.add("Seleccione os produtos para criar o look", LogStatus.ERROR)
      return;
    }

    const look = {
      shop_id: '1c13d9e3-41a3-47c5-83ae-8785441c878b',
      title: this.editLookFormGroup.get('title')?.value,
      description: this.editLookFormGroup.get('description')?.value,
      main_image: (this.selectedLookImages[0]) ? (this.selectedLookImages[0].previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, '') : null,
      feature_image_1: (this.selectedLookImages[1]) ? (this.selectedLookImages[1].previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, '') : null,
      feature_image_2: (this.selectedLookImages[2]) ? (this.selectedLookImages[2].previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, '') : null,
      feature_image_3: (this.selectedLookImages[3]) ? (this.selectedLookImages[3].previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, '') : null,
      product_id: this.selectedProducts$().map(product => product.id)
    }

    console.log(look)

    this.isEditing.set(true);
    this.lookFacade.create(JSON.stringify(look)).subscribe({
      next: (response) => {
        console.log(response)
        this.alertService.add("Look adicionado com êxito", LogStatus.SUCCESS);
        this.isEditing.set(false);
      },
      error: (error) => {
        this.alertService.add(error, LogStatus.ERROR);
        this.isEditing.set(false);
        console.error(error);
      }
    });

  }

}
