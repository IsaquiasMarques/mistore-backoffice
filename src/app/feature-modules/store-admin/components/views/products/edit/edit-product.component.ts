import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBrand } from '@core/base-models/base/brands.model';
import { ColorOption } from '@core/base-models/base/ColorOption.model';
import { IProductCategory } from '@core/base-models/base/product-category.model';
import { AlertService, LogStatus } from '@core/services/alert/alert.service';
import { LoaderService } from '@core/services/loader/loader.service';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { CategoryFacade } from '@store/facades/category.facade';
import { ColorFacade } from '@store/facades/color.facade';
import { AddProductFacade } from '@store/facades/products/add-product.facade';
import { ProductFacade } from '@store/facades/products/products.facade';
import { SizeFacade } from '@store/facades/size.facade';
import { IProductSubCategory, IProductSize, IProduct } from '@store/models/product.model';
import { map } from 'rxjs';

@Component({
  selector: 'mi-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  public loaderService = inject(LoaderService);
  private productFacade = inject(ProductFacade);
  private categoryFacade = inject(CategoryFacade);
  private sizeFacade = inject(SizeFacade);
  private colorFacade = inject(ColorFacade);
  private addProductFacade = inject(AddProductFacade);
  private alertService = inject(AlertService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  editProductFormGroup!: FormGroup;

  theProduct!: IProduct;
  theProductImages: string[] = [];

  pageLoaderIdentifier = PageLoaderIdentifier;

  files: any[] = [];

  selectedBrand!: IBrand[];
  selectedCategory!: IProductCategory[];
  selectedSubCategories!: IProductSubCategory[];
  selectedSizes!: { id: string, label: string, value: string }[];
  selectedColors: ColorOption[] = [];

  promotionRateValue = signal(0);

  brandsToSelect: WritableSignal<IBrand[]> = signal([]);
  categoriesToSelect: WritableSignal<IProductCategory[]> = signal([]);
  subCategoriesToSelect: WritableSignal<IProductSubCategory[]> = signal([]);
  sizes: WritableSignal<IProductSize[]> = signal([]);
  colors: WritableSignal<ColorOption[]> = signal([]);

  isAvailable: boolean = true;

  showColorModal: boolean = false;
  theColor: ColorOption | undefined;
  colorsWithImages: { [color: string]: any[] } = {};
  imagesColors: any[] = [];

  isEditing = signal(false);

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      const product_id = params.get('product');
      if(product_id == null) return;
      this.getTheProduct(product_id);
    });

    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.BRANDS_ADD_PRODUCTS, true);
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.CATEGORIES_ADD_PRODUCTS, true);
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.SUB_CATEGORIES_ADD_PRODUCTS, true);
    
    this.productFacade.brands().subscribe((incomingBrands: IBrand[]) => {
      this.brandsToSelect.set(incomingBrands);
      if(this.brandsToSelect.length > 0){
        this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.BRANDS_ADD_PRODUCTS, false);

      }else{
        this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.BRANDS_ADD_PRODUCTS);
      }
    });

    this.categoryFacade.categoriesWithSubcategories().subscribe((incomingCategories: IProductCategory[]) => {
      this.categoriesToSelect.set(incomingCategories);
      if(this.categoriesToSelect.length > 0){
        this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.CATEGORIES_ADD_PRODUCTS, false);

      }else{
        this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.CATEGORIES_ADD_PRODUCTS);
      }
    });

    this.colorFacade.all().pipe(
      map(incoming => {
        // incoming.forEach((ele: ColorOption) => {
        //   this.colorsWithImages[ele.id] = [];
        // });
        return incoming
      })
    ).subscribe((incoming: ColorOption[]) => this.colors.set(incoming));

    if(!this.selectedCategory){
      this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.SUB_CATEGORIES_ADD_PRODUCTS, false);
    }

    this.editProductFormGroup = new FormGroup({
      'productName': new FormControl('', [ Validators.required ]),
      'price': new FormControl('', [Validators.required, Validators.min(0)]),
      'qtd': new FormControl('', [Validators.required, Validators.min(0)]),
      'promotionRate': new FormControl('', [Validators.required, Validators.min(0)]),
      'description': new FormControl('', [Validators.required])
    })

  }

  addImagesToColor($event: any[]): void{
    this.colorsWithImages[this.theColor!.id] = $event;
  }

  imageHasLoaded(colorId: string, index: number){
    this.colorsWithImages[colorId][index]['hasLoaded'] = true;
  }

  removeFileItem(colorId: string, index: number){
    this.colorsWithImages[colorId].splice(index, 1);
  }

  hideColorModal($event: boolean): void{
    if($event){
      this.showColorModal = false;
    }
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
    this.sizeFacade.sizesOfSubcategory(this.selectedSubCategories[0].id).subscribe((incoming) => this.sizes.set(incoming));
  }

  selectedSizesEventHandler($event: any){
    this.selectedSizes = $event;
  }

  getSubCategoriesFromSelectedCategories(){
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.SUB_CATEGORIES_ADD_PRODUCTS, true);
    this.categoryFacade.subcategoriesOfCategory(this.selectedCategory[0].id).subscribe((incomingSubCategories: IProductSubCategory[]) => {
      this.subCategoriesToSelect.set(incomingSubCategories);
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
    let theColor = this.colors().find(color => color.id === colorId);
    if(theColor && 'selected' in theColor){
      theColor.selected = !theColor.selected;
      if(theColor.selected){
        
        // adiciona as imagens da cor clicada
        this.showColorModal = true;
        this.theColor = theColor;

        this.selectedColors.push(theColor);
      } else {
        const theIndex = this.selectedColors.findIndex(item => item.id === theColor!.id);
        if(theIndex >= 0){

          // remove as imagens da cor clicada
          
          this.selectedColors.splice(theIndex, 1);

        }
      }
    }
  }

  getTheProduct(id: string): void{
    this.loaderService.setLoadingStatus(PageLoaderIdentifier.PRODUCTS, true);
    this.productFacade.getProductById(id).subscribe({
      next: (product: any) => {
        this.theProduct = product;
        console.log(product)
        const featureImages = this.theProduct.featureImages?.map(i => i.image) || [];

        this.fullfillFormFields();
        
        this.theProductImages = [ this.theProduct.imagePath, ...featureImages ].filter(Boolean);
        this.loaderService.setLoadingStatus(PageLoaderIdentifier.PRODUCTS, false);
      },
      error: (error: any) => {
        this.alertService.add(error.message, LogStatus.ERROR);
        this.loaderService.setLoadingStatus(PageLoaderIdentifier.PRODUCTS, false);
      }
    });
  }

  fullfillFormFields(){;
    this.editProductFormGroup.get('productName')?.setValue(this.theProduct.name)
    this.editProductFormGroup.get('price')?.setValue(this.theProduct.price)
    this.editProductFormGroup.get('qtd')?.setValue(this.theProduct.quantity)
    this.editProductFormGroup.get('promotionRate')?.setValue(0) // this.theProduct.promotion_price
    this.editProductFormGroup.get('description')?.setValue(this.theProduct.description)
  }

  submitForm(): void{
    // after validation
    const fields: EditProductModel = {
      name: this.editProductFormGroup.get('productName')?.value,
      price: parseFloat(this.editProductFormGroup.get('price')!.value),
      stock_quantity: [parseInt(this.editProductFormGroup.get('qtd')!.value)],
      stock_status: [this.isAvailable],
      discount_status: true,
      discount_rate: (this.editProductFormGroup.get('promotionRate')?.value !== '') ? parseInt(this.editProductFormGroup.get('promotionRate')?.value) : 0,
      desc: this.editProductFormGroup.get('description')?.value,
      brand_id: this.selectedBrand[0].id,
      category_id: this.selectedCategory[0].id,
      subcategory_id: this.selectedSubCategories[0].id,
      size: this.selectedSizes.flatMap(_ => _.id),
      color: this.selectedColors.flatMap(_ => _.id),
      images: this.files.flatMap(_ => (_.previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, '')),
      image_filename: this.files.flatMap(_ => _.name),
      shop_id: '1c13d9e3-41a3-47c5-83ae-8785441c878b',
      coverimage: (this.files[0].previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, ''),
      coverimage_filename: this.files[0].name,
      imagescolor: Object.values(this.colorsWithImages).flatMap((images: any[]) => images.map(image => (image.previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, ''))),
      imagescolor_filename: Object.values(this.colorsWithImages).flatMap((images: any[]) => images.map(image => image.name))
    };

    this.isEditing.set(true);
    this.addProductFacade.addProduct(JSON.parse(JSON.stringify(fields))).subscribe({
      next: repsonse => {
        this.alertService.add("Produto actualizado com êxito", LogStatus.SUCCESS);
        this.router.navigate(['/store/products']);
        this.isEditing.set(false);
      },
      error: error => {
        this.alertService.add(error, LogStatus.ERROR);
        this.isEditing.set(false);
        console.error(error);
      }
    });
  }
}

export interface EditProductModel{
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
  image_filename: string[],
  imagescolor: string[],
  imagescolor_filename: string[]
}