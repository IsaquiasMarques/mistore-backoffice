import { BehaviorSubject, Observable } from "rxjs";
import { PaginationData } from "../base-models/base/pagination-data.model";

export class BaseState<T> {
    private _state: BehaviorSubject<T>;
    public readonly state$: Observable<T>;

    private _paginationState: BehaviorSubject<PaginationData> = new BehaviorSubject<PaginationData>(new PaginationData());
    public readonly paginationState$: Observable<PaginationData>;

    protected constructor (initialState: T){
        this._state = new BehaviorSubject(initialState);
        this.state$ = this._state.asObservable();
        this.paginationState$ = this._paginationState.asObservable();
    }

    get state (): T {
        return this._state.getValue();
    }

    set state (nextState: T) {
        this._state.next(nextState);
    }

    get paginationStateContent (): PaginationData {
        return this._paginationState.getValue();
    }

    set paginationStateContent (nextState: PaginationData) {
        this._paginationState.next(nextState);
    }
}