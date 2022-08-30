import { Component, OnInit } from '@angular/core';
import { MensajesPredt } from 'app/models/mensajesPredt';
import { ApimensajespredtService} from 'app/services/apimensajespredt.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mensajes-predt',
  templateUrl: './mensajes-predt.component.html',
})
export class MensajesPredtComponent implements OnInit {

  selectedValue=1;
  public MensajesLst: MensajesPredt[]=[];
  mensaje='';
  constructor(
    private _api: ApimensajespredtService,
    public _dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.getById();
  }

  getAll(){
    this._api.getAll().subscribe(res => {
         this.MensajesLst =[];
         this.MensajesLst = res;
      });
    }

    getById(){
      this._api.getById(this.selectedValue).subscribe(res => {
           this.mensaje = res.mensaje;
        });
      }

  save(){
    this._api.update({id: this.selectedValue, nombreMensaje:'', mensaje: this.mensaje}
    ).subscribe(res =>{
      if (res !== undefined){
          this.close();
      }
    })
  }

  close(){
    this._dialogRef.close();
  }

}
