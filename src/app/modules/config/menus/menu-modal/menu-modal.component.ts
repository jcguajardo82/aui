import { Component, OnInit,Inject,ViewChild} from '@angular/core';
import {  UntypedFormGroup, NgForm,UntypedFormBuilder,Validators  } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import {Menu} from 'app/models/menu.model';
import {MenuService} from 'app/services/menu.service'

class Status {
  label: string;
  val: string;
}


@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  animations   : fuseAnimations
})
export class MenuModalComponent implements OnInit {

  @ViewChild('dataNgForm') dataNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
      type   : 'success',
      message: ''
  };

  dataForm: UntypedFormGroup;
  showAlert: boolean = false;
  status : Status[];
  selectedSatus :string="true";
  _menu:Menu;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: { menu: Menu },
    private _matDialogRef: MatDialogRef<MenuModalComponent>,
    private _formBuilder: UntypedFormBuilder,
    private menuService:MenuService
  ) { 
    this.status = [
      {label: 'Activo', val: 'true'},
      {label: 'Inactivo', val: 'false'},     
    ];
  }

  ngOnInit(): void {
     // Edit
     if ( this._data.menu.menuId!=0 )
     {
   
         this.selectedSatus = String(this._data.menu.habilitado);

     }
     
 
       // Create the form
       this.dataForm = this._formBuilder.group({
         id          : [this._data.menu.menuId, Validators.required],
         padreId:  [this._data.menu.padreId, Validators.required],
         txtDesc      : [this._data.menu.descripcion, Validators.required],
         txtDescCorta     : [this._data.menu.descripcionCorta, [Validators.required]],
         txtUrl     : [this._data.menu.url, [Validators.required]],
         txtIcono     : [this._data.menu.icono],
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

  this._menu =new Menu;

  this._menu.menuId =this.dataForm.value["id"];
  this._menu.descripcion=this.dataForm.value["txtDesc"];
  this._menu.descripcionCorta=this.dataForm.value["txtDescCorta"];
  this._menu.url=this.dataForm.value["txtUrl"];
  this._menu.icono=this.dataForm.value["txtIcono"];
  this._menu.habilitado=this.dataForm.value["estatus"];
  this._menu.padreId=this.dataForm.value["padreId"];

  if(this._menu.menuId==0)
    {
      this.menuService.Add(this._menu)
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
    else{
      this.menuService.Update(this._menu)
      .subscribe(
        response => {
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
