import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { APIExtender } from "@core/class/api/api-extender.class";
import { environment } from "@env/environment.development";
import { WidgetPercentageStatusEnum } from "@shared/Enums/widget-percentage-status.enum";
import { StatisticsData } from "@store/models/statistics.model";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StatisticsApiService extends APIExtender{
    
    storeId: string = '1c13d9e3-41a3-47c5-83ae-8785441c878b';

    getProductsPageStatistics(): Observable<StatisticsData>{
        return this.http.get<StatisticsData>(`${ environment.backend }/api/products/Get-totalproduct?id=${ this.storeId }`, { headers: this.headers })
                .pipe(
                    map((incoming: any) => {
                        return {
                            main: incoming,
                            percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
                            percentageValue: 0,
                            footerLabelValue: 0
                        };
                    }),
                );
    }

    getAvailableProductsPageStatistics(): Observable<StatisticsData>{
        return this.http.get<StatisticsData>(`${ environment.backend }/api/StockApi/ActiveStock?id=${ this.storeId }`, { headers: this.headers })
                .pipe(
                    map((incoming: any) => {
                        return {
                            main: incoming,
                            percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
                            percentageValue: 0,
                            footerLabelValue: 0
                        };
                    }),
                );
    }

    getUnavailableProductsPageStatistics(): Observable<StatisticsData>{
        return this.http.get<StatisticsData>(`${ environment.backend }/api/StockApi/UnavailableStock?id=${ this.storeId }`, { headers: this.headers })
                .pipe(
                    map((incoming: any) => {
                        return {
                            main: incoming,
                            percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
                            percentageValue: 0,
                            footerLabelValue: 0
                        };
                    }),
                );
    }

}