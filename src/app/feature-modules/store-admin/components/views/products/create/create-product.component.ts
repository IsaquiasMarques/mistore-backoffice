import { Component, OnInit, inject, signal } from '@angular/core';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { ColorOption } from '@core/base-models/base/ColorOption.model';
import { IBrand } from '@core/base-models/base/brands.model';
import { IProductCategory } from '@core/base-models/base/product-category.model';
import { IProductSubCategory } from '@core/base-models/base/subcategory.model';
import { DropzoneFunctionalities } from '@shared/component-classes/dropzone-functionalities.class';
import { LoaderService } from '@core/services/loader/loader.service';
import { ProductFacade } from '@store/facades/products/products.facade';
import { AddProductFacade } from '@store/facades/products/add-product.facade';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mi-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent extends DropzoneFunctionalities implements OnInit {

  public loaderService = inject(LoaderService);
  private productFacade = inject(ProductFacade);
  private addProductFacade = inject(AddProductFacade);

  addProductFormGroup!: FormGroup;

  pageLoaderIdentifier = PageLoaderIdentifier;

  selectedBrand!: IBrand[];
  selectedCategory!: IProductCategory[];
  selectedSubCategories!: IProductSubCategory[];
  selectedSizes!: { id: string, label: string, value: string }[];
  selectedColors: ColorOption[] = [];

  promotionRateValue = signal(0);

  brandsToSelect: IBrand[] = [];
  categoriesToSelect: IProductCategory[] = [];
  subCategoriesToSelect: IProductSubCategory[] = [];
  sizes: { id: string, label: string, value: string }[] = [
    {
      id: 'id',
      label: 'XS',
      value: 'extra-small'
    },
    {
      id: 'id',
      label: 'S',
      value: 'small'
    },
    {
      id: 'id',
      label: 'M',
      value: 'medium'
    },
    {
      id: 'id',
      label: 'L',
      value: 'large'
    },
    {
      id: 'id',
      label: 'XL',
      value: 'extra-large'
    },
    {
      id: 'id',
      label: '2XL',
      value: 'super-large'
    },
  ];
  colors: ColorOption[] = [
    {
      id: '#754E53',
      hexCode: '#754E53',
      colorName: 'Castanho',
      selected: true,
    },
    {
      id: '#68183A',
      hexCode: '#68183A',
      colorName: 'Bege',
      selected: false,
    },
    {
      id: '#4CA7F8',
      hexCode: '#4CA7F8',
      colorName: 'Azul',
      selected: false,
    }
  ];

  isAvailable: boolean = true;

  ngOnInit(): void {
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.BRANDS_ADD_PRODUCTS, true);
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.CATEGORIES_ADD_PRODUCTS, true);
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.SUB_CATEGORIES_ADD_PRODUCTS, true);
    
    this.productFacade.brands().subscribe((incomingBrands: IBrand[]) => {
      this.brandsToSelect = incomingBrands;
      if(this.brandsToSelect.length > 0){
        this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.BRANDS_ADD_PRODUCTS, false);

      }else{
        this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.BRANDS_ADD_PRODUCTS);
      }
    });

    this.productFacade.categories().subscribe((incomingCategories: IProductCategory[]) => {
      this.categoriesToSelect = incomingCategories;
      if(this.categoriesToSelect.length > 0){
        this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.CATEGORIES_ADD_PRODUCTS, false);

      }else{
        this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.CATEGORIES_ADD_PRODUCTS);
      }
    });

    if(!this.selectedCategory){
      this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.SUB_CATEGORIES_ADD_PRODUCTS, false);
    }

    this.addProductFormGroup = new FormGroup({
      'productName': new FormControl('', [ Validators.required ]),
      'price': new FormControl('', [Validators.required, Validators.min(0)]),
      'qtd': new FormControl('', [Validators.required, Validators.min(0)]),
      'promotionRate': new FormControl('', [Validators.required, Validators.min(0)]),
      'description': new FormControl('', [Validators.required])
    })

  }

  selectedBrandEventHandler($event: any){
    this.selectedBrand = $event;
  }

  selectedCategoryEventHandler($event: any){
    this.selectedCategory = $event;
    this.getSubCategoriesFromSelectedCategories();
  }

  selectedSubCategoriesEventHandler($event: any){
    this.selectedSubCategories = $event;
  }

  selectedSizesEventHandler($event: any){
    this.selectedSizes = $event;
  }

  getSubCategoriesFromSelectedCategories(){
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.SUB_CATEGORIES_ADD_PRODUCTS, true);
    this.productFacade.subCategories(this.selectedCategory[0].id).subscribe((incomingSubCategories: IProductSubCategory[]) => {
      this.subCategoriesToSelect = incomingSubCategories;
      if(this.subCategoriesToSelect.length > 0){
        this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.SUB_CATEGORIES_ADD_PRODUCTS, false);

      }else{
        this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.SUB_CATEGORIES_ADD_PRODUCTS);
      }
    });
  }

  changeAvailability(){
    this.isAvailable = !this.isAvailable;
  }

  toggleSelectColor(colorId: string){
    let theColor = this.colors.find(color => color.id === colorId);
    if(theColor && 'selected' in theColor){
      theColor.selected = !theColor.selected;
    }
  }

  submitForm(): void{

    // after validation
    const fields: AddProductModel = {
      name: this.addProductFormGroup.get('productName')?.value,
      price: this.addProductFormGroup.get('price')?.value,
      qtd: this.addProductFormGroup.get('qtd')?.value,
      promotion: this.addProductFormGroup.get('promotionRate')?.value,
      description: this.addProductFormGroup.get('description')?.value,
      brand_id: this.selectedBrand[0].id,
      category_id: this.selectedCategory[0].id,
      subcategory_id: this.selectedSubCategories[0].id,
      sizes: this.selectedSizes.flatMap(_ => _.id),
      colors: this.selectedColors.flatMap(_ => _.id),
      avalability: this.isAvailable,
      images: this.files
    };

    this.addProductFacade.addProduct(fields);
  }
}

export interface AddProductModel{
  name: string,
  price: number,
  qtd: number,
  promotion: number,
  description: string,
  brand_id: string | undefined,
  category_id: string | undefined,
  subcategory_id: string | undefined,
  sizes: string[],
  colors: string[],
  avalability: boolean,
  images: File[]
}