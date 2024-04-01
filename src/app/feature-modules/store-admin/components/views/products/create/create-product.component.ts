import { Component, OnInit, inject } from '@angular/core';
import { PageLoaderIdentifier } from '@core/Enums/page-loader-id.enum';
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

}
