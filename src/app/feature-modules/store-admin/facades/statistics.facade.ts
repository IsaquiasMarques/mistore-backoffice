import { inject, Injectable } from "@angular/core";
import { StatisticsApiService as API } from "@store/api/statistics-api.service";
import { StatisticsData } from "@store/models/statistics.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StatisticsFacade{

    private api = inject(API);

    allProductsCount(): Observable<StatisticsData>{
        return this.api.getProductsPageStatistics();
    }

    availableProductsCount(): Observable<StatisticsData>{
        return this.api.getAvailableProductsPageStatistics();
    }

    unavailableProductsCount(): Observable<StatisticsData>{
        return this.api.getUnavailableProductsPageStatistics();
    }
}