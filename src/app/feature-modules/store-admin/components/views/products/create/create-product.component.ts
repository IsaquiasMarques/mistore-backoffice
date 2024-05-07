import { Component, OnInit, inject, signal } from '@angular/core';
import { PageLoaderIdentifier } from '@core/Enums/page-loader-id.enum';
import { ColorOption } from '@core/base-models/base/ColorOption.model';
import { IBrand } from '@core/base-models/base/brands.model';
import { IProductCategory } from '@core/base-models/base/category.model';
import { IProductSubCategory } from '@core/base-models/base/subcategory.model';
import { ISelectItem } from '@core/interfaces/select-item.interface';
import { LoaderService } from '@core/services/loader/loader.service';
import { ProductFacade } from '@store/facades/products.facade';

@Component({
  selector: 'mi-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {

  public loaderService = inject(LoaderService);
  private productFacade = inject(ProductFacade);

  pageLoaderIdentifier = PageLoaderIdentifier;

  selectedBrand!: IBrand[];
  selectedCategory!: IProductCategory[];
  selectedSubCategories!: IProductSubCategory[];
  selectedSizes!: { label: string, value: string }[];
  selectedColors: ColorOption[] = [];

  promotionRangeValue = signal(0);

  brandsToSelect: IBrand[] = [];
  categoriesToSelect: IProductCategory[] = [];
  subCategoriesToSelect: IProductSubCategory[] = [];
  sizes: { label: string, value: string }[] = [
    {
      label: 'XS',
      value: 'extra-small'
    },
    {
      label: 'S',
      value: 'small'
    },
    {
      label: 'M',
      value: 'medium'
    },
    {
      label: 'L',
      value: 'large'
    },
    {
      label: 'XL',
      value: 'extra-large'
    },
    {
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

  files: any[] = [];

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

  dropzoneOnChange($event: any){
    this.files = $event.files;
    this.startFilesSetup();
  }

  startFilesSetup(){
    this.files = [...this.files]; // forçar o files a ser considerado um array
    const promise = this.files.map(file => this.loadFile(file));
  }

  loadFile(file: any): Promise<void>{
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        file['previewUrl'] = e.target.result;
        file['hasLoaded'] = true;
        resolve();
      };
      fileReader.onerror = (error: any) => {
        console.log("Erro ao carregar o arquivo: ", error);
        reject(error)
      }
      fileReader.readAsDataURL(file);
    });
  }

  imageHasLoaded($index: number){
    this.files[$index]['hasLoaded'] = true;
  }

  removeFileItem($index: number){
    this.files.splice($index, 1);
  }

}
