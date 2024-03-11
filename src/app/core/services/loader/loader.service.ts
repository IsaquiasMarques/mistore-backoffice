import { Injectable } from "@angular/core";
import { LoaderHandler } from "./handler.service";
import { PageLoaderIdentifier } from "@app/core/Enums/page-loader-id.enum";

@Injectable({
    providedIn: 'root'
})
export class LoaderService extends LoaderHandler{

    loaderActionAfterTryFetching(identifier: PageLoaderIdentifier, intervalToCheckDataEntryInSeconds: number = 1, timeOutAfterInSeconds: number = 4): void{
        let checkingDataChangesInterval = setInterval(() => {

            let timeOutAfterWaiting = setTimeout(() => {
                this.setLoadingStatus(identifier, false);
                clearInterval(checkingDataChangesInterval);
            }, timeOutAfterInSeconds);

        }, intervalToCheckDataEntryInSeconds);
    }

}