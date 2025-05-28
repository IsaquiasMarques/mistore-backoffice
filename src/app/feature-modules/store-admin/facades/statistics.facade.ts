import { inject, Injectable } from "@angular/core";
import { StatisticsApiService } from "@store/api/statistics-api.service";
import { StatisticsData } from "@store/models/statistics.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StatisticsFacade{

    private api = inject(StatisticsApiService);

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