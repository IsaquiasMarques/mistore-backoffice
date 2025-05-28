import { HttpHeaders } from "@angular/common/http";
import { IBrand } from "@core/base-models/base/brands.model";
import { ColorOption } from "@core/base-models/base/ColorOption.model";
import { IProductCategory } from "@core/base-models/base/product-category.model";
import { APIExtender } from "@core/class/api/api-extender.class";
import { environment } from "@env/environment.development";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";
import { IProductSize } from "@store/models/product.model";
import { map, Observable, tap } from "rxjs";

export abstract class StoreApi extends APIExtender {
    
    getBrands(): Observable<IBrand[]>{
        return this.http.get<IBrand[]>(`${ environment.backend }/api/brands/all`, { headers: this.headers })
                        .pipe(
                            map((incoming: any[]) => Transformer.brands(incoming)),
                        );
    }

    getCategories(): Observable<IProductCategory[]>{
        return this.http.get<IProductCategory[]>(`${ environment.backend }/api/categories/all`, { headers: this.headers })
                        .pipe(
                            map((incoming: any[]) => Transformer.categories(incoming))
                        );
    }

    getSizes(subcategory_id?: string): Observable<IProductSize[]>{
        const headers = new HttpHeaders().set('apiKey', environment.supabase_key);
        return this.http.get<IProductSize[]>(`${ environment.supabase_url }/rest/v1/Sizes`, { headers: headers }).pipe(
            map((incoming: any[]) => Transformer.sizes(incoming)),
            map(incoming => (subcategory_id) ? incoming.filter(size => size.subcategory_id === subcategory_id) : incoming)
        );
    }

    getColors(): Observable<ColorOption[]>{
        const headers = new HttpHeaders().set('apiKey', environment.supabase_key);
        return this.http.get<ColorOption[]>(`${ environment.supabase_url }/rest/v1/Colors`, { headers: headers }).pipe(
            map((incoming: any[]) => Transformer.colors(incoming))
        );
    }

}