import { Component, inject } from '@angular/core';
import { DropzoneFunctionalities } from '@core/component-classes/dropzone-functionalities.class';
import { PageLoaderIdentifier } from '@core/Enums/page-loader-id.enum';
import { LoaderService } from '@core/services/loader/loader.service';

@Component({
  selector: 'mi-create-look',
  templateUrl: './create-look.component.html',
  styleUrl: './create-look.component.css'
})
export class CreateLookComponent extends DropzoneFunctionalities {

  public loaderService = inject(LoaderService);
  pageLoaderIdentifier = PageLoaderIdentifier;

  products: any[] = [
    'assets/images/products/image-1.png',
    'assets/images/products/image-2.png',
    'assets/images/products/image-3.png',
    'assets/images/products/image-4.png',
    'assets/images/products/image-1.png',
    'assets/images/products/image-2.png',
    'assets/images/products/image-3.png',
    'assets/images/products/image-4.png',
  ];

}
