import { Component, inject, Input } from '@angular/core';
import { Params } from '@angular/router';
import { LookProductRelationService } from '@shared/services/look-product.service';
import { ILook } from '@store/models/looks.model';

@Component({
  selector: 'mi-look',
  templateUrl: './look.component.html',
  styleUrl: './look.component.css'
})
export class LookComponent {
  @Input({ required: true }) look!: ILook;
  @Input() route = '/store/looks/edit/';
  @Input() queryParams: Params | null = null;
  private lookProductRelation = inject(LookProductRelationService);

  linkRelatedProducts(): void{
    if(!(this.look.products.length > 0)) return;
    this.lookProductRelation.attachProducts(this.look.products);
  }
}
