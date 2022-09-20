import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {  UntypedFormGroup, NgForm,UntypedFormBuilder,Validators  } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lenguaje } from 'app/models/lenguaje.model';
import { LenguajeService } from 'app/services/lenguaje.service';

@Component({
  selector: 'app-idiom-modal',
  templateUrl: './idiom-modal.component.html',
  encapsulation: ViewEncapsulation.None,

})
export class IdiomModalComponent implements OnInit {

  @ViewChild('MyNgForm') MyNgForm: NgForm;

  alert: any;
  myNgForm: UntypedFormGroup;

  len : Lenguaje;

  constructor(private _formBuilder: UntypedFormBuilder,
    private lenguajeService:LenguajeService,
    @Inject(MAT_DIALOG_DATA) public _data: { len: Lenguaje },
    private _matDialogRef: MatDialogRef<IdiomModalComponent>,) { }

  ngOnInit(): void {
    // Create the support form
    this.myNgForm = this._formBuilder.group({
      id          : [this._data.len.idLenguaje, Validators.required],
      nombre   : [this._data.len.nombre, Validators.required],    
      codigo: [this._data.len.codigo, Validators.required],
    });

    console.log(this._data.len.codigo);
  }

 // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------



  onNoClick(): void {
    // Close the dialog
      this._matDialogRef.close();
    }

  Save():void {
        // Do nothing if the form is invalid
    if ( this.myNgForm.invalid )
    {
        return;
    }

    // Disable the form
    this.myNgForm.disable();

    this.len =new Lenguaje;

    this.len.idLenguaje =this.myNgForm.value["id"];
    this.len.nombre=this.myNgForm.value["nombre"];
    this.len.codigo=this.myNgForm.value["codigo"];
  

      if(this.len.idLenguaje==0){
          this.lenguajeService.AddLenguaje(this.len)
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
        this.lenguajeService.UpdLenguaje(this.len)
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

  }

  onError(_message : string):void{
    // Re-enable the form
    this.myNgForm.enable();

    // Reset the form
    this.MyNgForm.resetForm();

    // Set the alert
    this.alert = {
        type   : 'error',
        message: _message
    };

    // Show the alert
    //this.showAlert = true;

  }

  
}
