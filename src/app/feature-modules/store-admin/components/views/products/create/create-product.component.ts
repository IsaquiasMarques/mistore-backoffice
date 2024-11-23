import { Component, OnInit, inject, signal } from '@angular/core';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { ColorOption } from '@core/base-models/base/ColorOption.model';
import { IBrand } from '@core/base-models/base/brands.model';
import { IProductCategory } from '@core/base-models/base/product-category.model';
import { IProductSubCategory } from '@core/base-models/base/subcategory.model';
import { LoaderService } from '@core/services/loader/loader.service';
import { ProductFacade } from '@store/facades/products/products.facade';
import { AddProductFacade } from '@store/facades/products/add-product.facade';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mi-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {

  public loaderService = inject(LoaderService);
  private productFacade = inject(ProductFacade);
  private addProductFacade = inject(AddProductFacade);

  addProductFormGroup!: FormGroup;

  pageLoaderIdentifier = PageLoaderIdentifier;

  files: any[] = [];

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
      id: '0b03bb36-41bb-4552-825f-6721879d5be7',
      label: 'SM',
      value: 'small'
    },
    {
      id: '57f0e8f9-e889-4bf2-8dc7-e0213f67242a',
      label: 'MS',
      value: 'medium'
    },
    {
      id: 'e4eacc0c-b75a-42d4-95e1-eae0d8113a39',
      label: 'Z',
      value: 'z'
    },
    {
      id: '457af81b-2e00-4d83-906a-2a86a0dbbada',
      label: 'XL',
      value: 'extra-large'
    },
    {
      id: 'e25355d5-ed45-418b-892d-40d4bb5a10a6',
      label: 'XXL',
      value: 'super-large'
    },
  ];
  colors: ColorOption[] = [
    {
      id: '301bfb7b-18eb-4736-9682-90bffe0265a8',
      hexCode: '#ffcc00',
      colorName: 'Amarelo',
      selected: false,
    },
    {
      id: '3344b865-e2dc-45fc-a4f3-9036444df87b',
      hexCode: '#FF1493',
      colorName: 'Deep Pink',
      selected: false,
    },
    {
      id: '6ce8fddc-8c0f-4cb1-8c8f-ae816a72052b',
      hexCode: '#FFD700',
      colorName: 'Gold',
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
      if(theColor.selected){
        this.selectedColors.push(theColor);
      } else {
        const theIndex = this.selectedColors.findIndex(item => item.id === theColor!.id);
        if(theIndex >= 0){
          this.selectedColors.splice(theIndex, 1);
        }
      }
    }
  }

  submitForm(): void{
    // after validation
    const fields: AddProductModel = {
      name: this.addProductFormGroup.get('productName')?.value,
      price: parseFloat(this.addProductFormGroup.get('price')!.value),
      stock_quantity: [parseInt(this.addProductFormGroup.get('qtd')!.value)],
      stock_status: [this.isAvailable],
      discount_status: true,
      discount_rate: (this.addProductFormGroup.get('promotionRate')?.value !== '') ? parseInt(this.addProductFormGroup.get('promotionRate')?.value) : 0,
      desc: this.addProductFormGroup.get('description')?.value,
      brand_id: this.selectedBrand[0].id,
      category_id: this.selectedCategory[0].id,
      subcategory_id: this.selectedSubCategories[0].id,
      size: this.selectedSizes.flatMap(_ => _.id),
      color: this.selectedColors.flatMap(_ => _.id),
      images: this.files.flatMap(_ => _.previewUrl),
      images_filename: this.files.flatMap(_ => _.name),
      shop_id: '1c13d9e3-41a3-47c5-83ae-8785441c878b',
      coverimage: this.files[0].previewUrl,
      coverimage_filename: '',
      imagescolor: [],
      imagescolor_filename: []
    };

    this.addProductFacade.addProduct(JSON.parse(JSON.stringify(fields)));
  }
}

export interface AddProductModel{
  name: string,
  price: number,
  stock_quantity: number[],
  stock_status: boolean[]
  discount_status: boolean,
  discount_rate: number,
  shop_id: string,
  coverimage: string,
  coverimage_filename: string,
  desc: number,
  brand_id: string | undefined,
  category_id: string | undefined,
  subcategory_id: string | undefined,
  size: string[],
  color: string[],
  images: string[],
  images_filename: string[],
  imagescolor: string[],
  imagescolor_filename: string[]
}