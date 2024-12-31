import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { LoaderService } from '@core/services/loader/loader.service';
import { LookProductRelationService } from '@shared/services/look-product.service';
import { IProduct } from '@store/models/product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LookFacade } from '@store/facades/look.facade';

@Component({
  selector: 'mi-create-look',
  templateUrl: './create-look.component.html',
  styleUrl: './create-look.component.css'
})
export class CreateLookComponent implements OnInit {

  public loaderService = inject(LoaderService);
  public pageLoaderIdentifier = PageLoaderIdentifier;
  public selectedProducts$: Signal<IProduct[]> = computed(() => this.lookProductRelationshipService.selectedProductsToAttachOnNewLook$());

  private lookFacade = inject(LookFacade);
  private lookProductRelationshipService = inject(LookProductRelationService);

  selectedLookImages: any[] = [];

  createLookFormGroup!: FormGroup;

  ngOnInit(): void {
    this.createLookFormGroup = new FormGroup({
      'title': new FormControl('', [ Validators.required, Validators.maxLength(30) ]),
      'description': new FormControl('', [ Validators.required, Validators.maxLength(30) ])
    })
  }

  submit(): void{
    if(this.createLookFormGroup.invalid) return;
    if(!(this.selectedProducts$().length > 0)) return;
    if(!(this.selectedLookImages.length > 0)) return;

    const look = {
      shop_id: '1c13d9e3-41a3-47c5-83ae-8785441c878b',
      title: this.createLookFormGroup.get('title')?.value,
      description: this.createLookFormGroup.get('description')?.value,
      main_image: (this.selectedLookImages[0]) ? (this.selectedLookImages[0].previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, '') : null,
      feature_image_1: (this.selectedLookImages[1]) ? (this.selectedLookImages[1].previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, '') : null,
      feature_image_2: (this.selectedLookImages[2]) ? (this.selectedLookImages[2].previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, '') : null,
      feature_image_3: (this.selectedLookImages[3]) ? (this.selectedLookImages[3].previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, '') : null,
      product_id: this.selectedProducts$().map(product => product.id)
    }

    console.log(look)

    this.lookFacade.create(JSON.stringify(look)).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {
        console.error(error)
      }
    });

  }

}
