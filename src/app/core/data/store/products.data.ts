import { computed, Injectable, signal, Signal, WritableSignal } from "@angular/core";
import { IProduct, IProductResponse } from "@store/models/product.model";
import { Store, StoredataInterface } from "./store.interface";

@Injectable({
    providedIn: 'root'
})
export class ProductsData implements StoredataInterface{

    private paginatedProducts: WritableSignal<Store> = signal({ total: 0, pages: { 0: [] } });
    private generalProducts: WritableSignal<IProductResponse> = signal({ total: 0, products: [] });

    paginatedData(page: number, total: number, data: any[]): void {
        this.paginatedProducts.update(obj => ({
            ...obj,
            total: total,
            pages: {
                ...obj.pages,
                [page]: obj.pages[page] ? obj.pages[page] : data
            }
        }));
    }
    
    clearData(): boolean{
        this.paginatedProducts.set({ total: 0, pages: { 0: [] } });
        return true;
    }

    nonPaginatedData(total:  number, data: any[]): void {
        this.generalProducts.set(
            {
                ...this.generalProducts(),
                total: total,
                products: [ ...this.generalProducts().products, ...data ]
            }
        );
    }

    dataOfPage(page: number): Signal<IProductResponse> {
        return computed(() => ({ total: this.paginatedProducts().total, products: this.paginatedProducts().pages[page] }));
    }

    allDatas(): Signal<IProductResponse> {
        return computed(() => ({ total: this.generalProducts().total, products: this.generalProducts().products }));
    }
}