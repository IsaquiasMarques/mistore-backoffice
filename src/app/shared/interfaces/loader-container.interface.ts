import { BehaviorSubject } from "rxjs";

export interface ILoaderContainer{
    [key: string]: BehaviorSubject<boolean>
}