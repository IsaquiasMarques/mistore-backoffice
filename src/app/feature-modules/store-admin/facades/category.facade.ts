import { inject, Injectable } from "@angular/core";
import { IProductCategory } from "@core/base-models/base/product-category.model";
import { StoreApi } from "@store/api/store.api.service";
import { IProductSubCategory } from "@store/models/product.model";
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryFacade{

    private categories$ = new BehaviorSubject<IProductCategory[]>([]);
    private API = inject(StoreApi);

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