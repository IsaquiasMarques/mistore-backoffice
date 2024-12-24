import { computed, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { IProduct } from "@store/models/product.model";

@Injectable({
    providedIn: 'root'
})
export class LookProductRelationService{

    private selectedProductsToAttachOnNewLook: WritableSignal<IProduct[]> = signal([]);
    public selectedProductsToAttachOnNewLook$: Signal<IProduct[]> = computed(() => this.selectedProductsToAttachOnNewLook());

    attachProducts(products: IProduct[]): void{
        this.selectedProductsToAttachOnNewLook.set(products);
    }
}