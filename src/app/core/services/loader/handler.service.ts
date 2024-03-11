import { PageLoaderIdentifier } from "@app/core/Enums/page-loader-id.enum";
import { ILoaderContainer } from "@app/core/interfaces/loader-container.interface";
import { BehaviorSubject } from "rxjs";

export class LoaderHandler{

    private loadingContainer: ILoaderContainer = {
        'dashboard-widgets': new BehaviorSubject(false),
        'wallet-widgets': new BehaviorSubject(false),
        'wallet-products': new BehaviorSubject(false),
    }

    toggleLoadingStatus(identifier: PageLoaderIdentifier): void{
        if(!this.loadingContainer[identifier]){
            this.loadingContainer[identifier] = new BehaviorSubject(false);
        }
        this.loadingContainer[identifier].next(!this.loadingContainer[identifier].value)
    }

    setLoadingStatus(identifier: PageLoaderIdentifier, status: boolean): void{
        this.loadingContainer[identifier].next(status);
    }

    getLoadingStatus(identifier: PageLoaderIdentifier): BehaviorSubject<boolean>{
        return this.loadingContainer[identifier];
    }

    getLoadingContainer(): ILoaderContainer{
        return this.loadingContainer;
    }

}