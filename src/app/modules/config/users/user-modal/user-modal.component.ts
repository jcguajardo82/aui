import { Component, OnInit,Inject,ViewChild} from '@angular/core';
import {  UntypedFormGroup, NgForm,UntypedFormBuilder,Validators  } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import {User} from 'app/models/user.model';
import {Rol} from 'app/models/rol.model';
import {RolService } from 'app/services/rol.service';
import {UserService } from 'app/services/user.service';
import { valid } from 'chroma-js';

class Status {
  label: string;
  val: string;
}

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html'
  ,animations   : fuseAnimations
})

export class UserModalComponent implements OnInit {
  @ViewChild('dataNgForm') dataNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
      type   : 'success',
      message: ''
  };

  dataForm: UntypedFormGroup;
  showAlert: boolean = false;
  roles: Rol[]| null;
  selectedRolId : number;
  status : Status[];
  selectedSatus :string="true";
  _user:User| null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: { user: User },
    private _matDialogRef: MatDialogRef<UserModalComponent>,
    private _formBuilder: UntypedFormBuilder,
    private rolService:RolService,
    private userService :UserService
  ) { 
    this.status = [
      {label: 'Activo', val: 'true'},
      {label: 'Inactivo', val: 'false'},     
  ];

  }

  ngOnInit(): void {
    this.getRoles();
     
    // Edit
    if ( this._data.user.idUsuario!=0 )
    {

        this.selectedRolId= Number(this._data.user.rol);
        this.selectedSatus = String(this._data.user.activo);
        //console.log("Llamamos el servicio de get user by id")
    }
    

      // Create the form
      this.dataForm = this._formBuilder.group({
        id          : [this._data.user.idUsuario, Validators.required],
        nombre      : [this._data.user.nombre, Validators.required],
        correo      : [this._data.user.correo, [Validators.required, Validators.email]],
        usuario     : [this._data.user.usuario, [Validators.required]],
        password     : [this._data.user.password, [Validators.required]],
        estatus     : ['', [Validators.required]],
        rol         : ['', Validators.required],
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

    this._user =new User;

    this._user.idUsuario =this.dataForm.value["id"];
    this._user.nombre=this.dataForm.value["nombre"];
    this._user.rol=this.dataForm.value["rol"];
    this._user.activo=this.dataForm.value["estatus"];
    this._user.usuario=this.dataForm.value["usuario"];
    this._user.correo=this.dataForm.value["correo"];
    this._user.password=this.dataForm.value["password"];

    if(this._user.idUsuario==0){
        this.userService.Add(this._user)
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
                  this.onError(error);
                
                });
    }else{
      this.userService.Update(this._user)
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
                  this.onError(error);
                });
    }

    
  };

  getRoles(): void{
    this.rolService.getAll() .subscribe(
      data => {
        if(data.isSuccess){
        this.roles = data.result;}
        else{
          this.onError(data.message);
        }
       /*  console.log(data.result);
        console.log(data.message); */
       
      },
      error => {
        console.log(error);
        
       /*  this.messageService.add({severity:'error', summary: 'Error', detail: error, life: 3000}); */
      });
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
