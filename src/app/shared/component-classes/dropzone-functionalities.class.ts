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
    this.files = [...this.files]; 
    const promise = this.files.map(file => this.loadFile(file));
  }

  loadFile(file: any): Promise<void>{
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        
        const extension = file.name.substring(file.name.lastIndexOf('.'));
        const shortToken = this.generateShortToken();
        const hashedName = `file_${shortToken}${extension}`;

        file['hashedName'] = hashedName;
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

  private generateShortToken(length: number = 6): string {
    return Math.random().toString(36).substring(2, 2 + length);
  }

}