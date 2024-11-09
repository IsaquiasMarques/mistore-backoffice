import { Directive, EventEmitter, Input, Output } from "@angular/core";

@Directive()
export class DropzoneFunctionalities{
    
  files: any[] = [];
  @Input() multi: boolean = true;
  @Output() outcomeFiles: EventEmitter<any[]> = new EventEmitter<any[]>();

  emitOutComeFiles(){
    this.outcomeFiles.emit(this.files);
  }

  dropzoneOnChange($event: any){
    this.files = $event.files;
    this.startFilesSetup();
  }

  startFilesSetup(){
    this.files = [...this.files]; // forçar o files a ser considerado um array
    const promise = this.files.map(file => this.loadFile(file));
  }

  loadFile(file: any): Promise<void>{
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        file['previewUrl'] = e.target.result;
        file['hasLoaded'] = true;
        resolve();
      };
      fileReader.onerror = (error: any) => {
        console.log("Erro ao carregar o arquivo: ", error);
        reject(error)
      }
      fileReader.readAsDataURL(file);
    });
  }

  imageHasLoaded($index: number){
    this.files[$index]['hasLoaded'] = true;
  }

  removeFileItem($index: number){
    this.files.splice($index, 1);
  }

}