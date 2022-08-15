import { Component, OnInit,Inject,ViewChild} from '@angular/core';
import {  UntypedFormGroup, NgForm,UntypedFormBuilder,Validators  } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import {User} from 'app/models/user.model';
import {Rol} from 'app/models/rol.model';
import { RolService } from 'app/services/rol.service';

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
  selectedRolId : string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: { user: User },
    private _matDialogRef: MatDialogRef<UserModalComponent>,
    private _formBuilder: UntypedFormBuilder,
    private rolService:RolService
  ) { }

  ngOnInit(): void {
    this.getRoles();
     // Create the form
     this.dataForm = this._formBuilder.group({
      nombre      : ['', Validators.required],
      usuario     : ['', [Validators.required]],
      estatus     : ['', [Validators.required]],
      rol         : ['', Validators.required],
    });

   
    // Edit
    if ( this._data.user.idUsuario!=0 )
    {
       /*  // Request the data from the server
        this._notesService.getNoteById(this._data.note.id).subscribe();

        // Get the note
        this.note$ = this._notesService.note$; */

        console.log("Llamamos el servicio de get user by id")
    }
    // Add
    else
    {
       console.log(this._data.user)
    }
  }

  Save():void{};

  getRoles(): void{
    this.rolService.getAll() .subscribe(
      data => {
        if(data.isSuccess){
        this.roles = data.result;}
        else{
         /*  this.messageService.add({severity:'error', summary: 'Error', detail: data.message, life: 3000}); */
        }
       /*  console.log(data.result);
        console.log(data.message); */
        console.log(data.message)
      },
      error => {
        console.log(error);
        
       /*  this.messageService.add({severity:'error', summary: 'Error', detail: error, life: 3000}); */
      });
  }
}
