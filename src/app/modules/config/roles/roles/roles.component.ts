import { Component, OnInit } from '@angular/core';
import {RolService} from  'app/services/rol.service';
import { MatDialog } from '@angular/material/dialog';

import {Rol} from 'app/models/rol.model'; 
import { RolModalComponent } from '../rol-modal/rol-modal.component';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',

})
export class RolesComponent implements OnInit {
 roles: Rol[];
 rol:Rol;
 selectedRolId : number;


  constructor(
    private rolService:RolService,
    private _modal :MatDialog) {  }

  ngOnInit(): void {
    this.rolService.getAll() .subscribe(
      data => {
        if(data.isSuccess){
        this.roles = data.result;}
        else{
          console.log(data.message);
        }    
      },
      error => {
        console.log(error.message);
      });
  }

  addNew(): void
  {
    this.showModal(new Rol);
  }

  startEdit():void{

    if (this.selectedRolId != undefined) {
      this.rolService.getRol(this.selectedRolId).subscribe(
        data => {
          if (data.isSuccess) {
            this.rol = { ...data.result };           
            this.showModal(data.result);
          }
          else {
            console.log(data.message);
          }
  
        },
        error => {
          console.log(error.message);
          
        });
    }
   
  }

  onChangeRol():void{
    console.log('cambio de rol');
  }


  showModal(_rol:Rol):void{
    //this.user = new User;
    this._modal.afterAllClosed.subscribe(data=> this.ngOnInit() );
    this._modal.open(RolModalComponent, {
        autoFocus: false,
        data     : {
            rol: _rol
        }
    });
  }

}
