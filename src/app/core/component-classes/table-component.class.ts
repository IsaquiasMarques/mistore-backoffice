

export class TableComponentExtender{
    
    TABLE_STICKY_TOP!: number;
    checkbox!: boolean;
    pagination!: boolean;
    perPage!: number;
    route!: string;
    withImage!: boolean;
    withTinyText!: boolean;
    imageRadius!: 'lg' | 'full';
    placeholderCount!: number;
    totalItems!: number;
    currentPage!: number;

    pages: number[] = [];

    selectedItems: string[] = [];

    selectItem(itemId: string){
        let itemIndex: string | number = this.isSelected(itemId, 'index');
        if((typeof(itemIndex) === 'number') && itemIndex !== -1){
            this.selectedItems.splice(itemIndex, 1);
            return;
        }
        this.selectedItems.push(itemId);
    }

    isSelected(itemId: string, returningString: 'checked' | 'index'): string | number{
        let itemIndexOnSelection = this.selectedItems.findIndex(item => item === itemId);

        switch(returningString){
            case 'checked':
                return (itemIndexOnSelection !== -1) ? 'checked' : '';
            case 'index':
                return itemIndexOnSelection;
            default:
                return itemIndexOnSelection;
        }
    }

    calculatePages(){
        let pagesCount = 0;
        let remain = this.totalItems % this.perPage;

        if(remain === 0){
            pagesCount = Math.floor(this.totalItems / this.perPage);

        }else{
            pagesCount = Math.floor(this.totalItems / this.perPage) + 1;
        }

        for (let index = 1; index <= pagesCount; index++) {
            let page = this.pages.find(item => item === index);
            if(!page){
                this.pages.push(index);
            }else{
                return;
            }
        }

    }

    generatePlaceholders(): number[]{
        return Array.from({ length: this.placeholderCount });
    }
}