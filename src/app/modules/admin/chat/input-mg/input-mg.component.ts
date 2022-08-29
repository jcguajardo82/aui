import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { toBase64 } from '../common';

@Component({
  selector: 'app-input-mg',
  templateUrl: './input-mg.component.html'
})
export class InputMgComponent implements OnInit {
  image: string = "" ;

  constructor() { }
  @Output()
  fileSelected: EventEmitter<File> = new EventEmitter<File>();
  ngOnInit(): void {
  }

  change(event: any){
    if (event.target.files.length > 0){
      const file: File = event.target.files[0];
      // toBase64(file).then((value: any)  => this.image = value)
      // .catch(error => console.log(error));
      //console.log(file);
      if(file.type == 'application/pdf' || file.type == 'image/jpeg' || file.type == 'image/png')
          this.fileSelected.emit(file);
      else
        alert('El Archivo Seleccinado no esta permitido');
    }
  }
}
