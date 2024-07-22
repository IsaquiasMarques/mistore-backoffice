export class Paginator{

    static paginate(array: any[], page: number, limit_per_page: number): any[]{
        const startIndex = (page - 1) * limit_per_page;
        const endIndex = startIndex + (limit_per_page - 1);

        return array.slice(startIndex, endIndex + 1)
    }

}