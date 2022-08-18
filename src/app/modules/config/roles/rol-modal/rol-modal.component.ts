import { Component, OnInit,Inject,ViewChild} from '@angular/core';
import {  UntypedFormGroup, NgForm,UntypedFormBuilder,Validators  } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Rol} from 'app/models/rol.model';
import {RolService} from  'app/services/rol.service';
import { FuseAlertType } from '@fuse/components/alert';

class Status {
  label: string;
  val: string;
}

@Component({
  selector: 'app-rol-modal',
  templateUrl: './rol-modal.component.html',
  
})
export class RolModalComponent implements OnInit {

  @ViewChild('dataNgForm') dataNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
  };

  dataForm: UntypedFormGroup;
  showAlert: boolean = false;
  status : Status[];
  selectedSatus :string="true";

  _rol:Rol;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: { rol: Rol },
    private _matDialogRef: MatDialogRef<RolModalComponent>,
    private _formBuilder: UntypedFormBuilder,
    private rolService:RolService,
  ) {  
      this.status = [
        {label: 'Activo', val: 'true'},
        {label: 'Inactivo', val: 'false'},     
      ];
  }

  ngOnInit(): void {
     // Edit
     if ( this._data.rol.idRol!=0 )
     {
   
         this.selectedSatus = String(this._data.rol.activo);

     }
     
 
       // Create the form
       this.dataForm = this._formBuilder.group({
         id          : [this._data.rol.idRol, Validators.required],
        
         txtNombreRol      : [this._data.rol.nombreRol, Validators.required],
         txtDesc     : [this._data.rol.descripcion, [Validators.required]],        
         estatus     : ['', [Validators.required]],
         
       });
  }

  onNoClick(): void {
    // Close the dialog
      this._matDialogRef.close();
  }

  Save():void{
      // Do nothing if the form is invalid
      if ( this.dataForm.invalid )
      {
          return;
      }

      // Disable the form
      this.dataForm.disable();

      // Hide the alert
      this.showAlert = false;

      this._rol =new Rol;

      this._rol.idRol =this.dataForm.value["id"];
      this._rol.descripcion=this.dataForm.value["txtDesc"];
      this._rol.nombreRol=this.dataForm.value["txtNombreRol"];
      this._rol.activo=this.dataForm.value["estatus"];
   

      if(this._rol.idRol==0)
        {
          this.rolService.addRol(this._rol)
                  .subscribe(
                    response => {
                      //console.log("agrego");
                      //console.log(response);
                      if (response.isSuccess) {
                        this.onNoClick();
                      }
                      else {
                      this.onError(response.message);
                      }
                    
                    },
                    error => {
                      this.onError(error.message);
                    
                    });
        }
       
  }

  onError(_message : string):void{
      // Re-enable the form
      this.dataForm.enable();

      // Reset the form
      this.dataNgForm.resetForm();

      // Set the alert
      this.alert = {
          type   : 'error',
          message: _message
      };

      // Show the alert
      this.showAlert = true;

  }
}
