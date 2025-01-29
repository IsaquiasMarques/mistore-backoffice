import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService, LogStatus } from '@core/services/alert/alert.service';
import { LoaderService } from '@core/services/loader/loader.service';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { LookProductRelationService } from '@shared/services/look-product.service';
import { LookFacade } from '@store/facades/look.facade';
import { IProduct } from '@store/models/product.model';

@Component({
  selector: 'mi-edit-look',
  templateUrl: './edit-look.component.html',
  styleUrl: './edit-look.component.css'
})
export class EditLookComponent implements OnInit {
  public loaderService = inject(LoaderService);
  public pageLoaderIdentifier = PageLoaderIdentifier;
  public selectedProducts$: Signal<IProduct[]> = computed(() => this.lookProductRelationshipService.selectedProductsToAttachOnNewLook$());

  private lookFacade = inject(LookFacade);
  private lookProductRelationshipService = inject(LookProductRelationService);

  private alertService = inject(AlertService);
  private activatedRoute = inject(ActivatedRoute);

  selectedLookImages: any[] = [];

  editLookFormGroup!: FormGroup;

  isEditing = signal(false);

  ngOnInit(): void {
    this.editLookFormGroup = new FormGroup({
      'title': new FormControl('', [ Validators.required, Validators.maxLength(30) ]),
      'description': new FormControl('', [ Validators.required, Validators.maxLength(30) ])
    })

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id') ?? null;

      if(!id) return;
      this.getTheLook(id);
    });
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
