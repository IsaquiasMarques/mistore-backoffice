import { computed, inject, Injectable, signal, Signal } from "@angular/core";
import { ApiService } from "@core/api/api.service";
import { IProductCategory } from "@core/base-models/base/product-category.model";
import { IProductSubCategory } from "@store/models/product.model";
import { BehaviorSubject, map, Observable, of, take } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryFacade{

    private categories$ = new BehaviorSubject<IProductCategory[]>([]);
    private API = inject(ApiService);

    constructor(){
        this.categoriesWithSubcategories();
    }

    categoriesWithSubcategories(): Observable<IProductCategory[]>{
        return this.API.getCategories().pipe(
            map(i => {
                this.categories$.next(i);
                return i;
            })
        );
    }

    get onlyCategories(): Observable<IProductCategory[]>{
        return this.categories$.pipe(
            map((categories: any[]) => {
                return categories.flatMap(c=> {
                    return {
                        id: c.id,
                        name: c.name,
                        slug: c.slug
                    }
                })
            })
        );
    }

    subcategoriesOfCategory(category_id: string): Observable<IProductSubCategory[]>{
        return this.categories$.asObservable().pipe(
            map((categories: IProductCategory[]) => {
                const theCategory = categories.find(c => c.id === category_id);
                if(theCategory === undefined){
                    return [];
                } else {
                    return theCategory.subcategories ?? [];
                }
            })
        )
    }

}