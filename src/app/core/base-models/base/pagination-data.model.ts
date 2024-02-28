export class PaginationData{
    pageNumber: number;
    pageSize: number;
    totalPages: number = 0;
    totalItems: number = 0;
    currentSubsetPage: number[] = [];
    constructor(pageNumber: number = 1, pageSize: number = 6){
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}