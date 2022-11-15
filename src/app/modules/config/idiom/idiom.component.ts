import { Component, OnInit,ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { LenguajeService} from 'app/services/lenguaje.service'
import {Lenguaje} from 'app/models/lenguaje.model'
import { MatDialog } from '@angular/material/dialog';
import {IdiomModalComponent} from 'app/modules/config/idiom/idiom-modal/idiom-modal.component'
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoService } from '@ngneat/transloco';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-idiom',
  templateUrl: './idiom.component.html',

})
export class IdiomComponent implements OnInit {

  @ViewChild('tableList', {read: MatSort}) TableMatSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  DataSource: MatTableDataSource<any> = new MatTableDataSource();
  TableColumns: string[] = ['idLenguaje', 'codigo', 'nombre','traduccion','actions'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  lenguajes:Lenguaje[];
  lenguaje:Lenguaje;
  configForm: UntypedFormGroup;


  constructor(private lenguajeService:LenguajeService
    ,private _modal :MatDialog
    , private translocoService: TranslocoService
    , private _fuseConfirmationService: FuseConfirmationService
    ,private _formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
     // Get the data
     this.lenguajeService.getLenguajes()
     .pipe(takeUntil(this._unsubscribeAll))
     .subscribe((data) => {

         // Store the data
         this.lenguajes = data;

         // Store the table data
         this.DataSource.data = this.lenguajes;

     });
  }

/**
 * After view init
 */
  ngAfterViewInit(): void
  {
      // Make the data source sortable
      this.DataSource.sort = this.TableMatSort;
  }

  /**
  * On destroy
  */
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
  * Track by function for ngFor loops
  *
  * @param index
  * @param item
  */
  trackByFn(index: number, item: any): any
  {
      return item.id || index;
  }

  addNew(): void
  {
    this.lenguaje =new Lenguaje;
   
    this._modal.afterAllClosed.subscribe(data=> this.ngOnInit() );
    this._modal.open(IdiomModalComponent, {
        autoFocus: false,
        data     : {
            len: this.lenguaje
        }
    });
  }

  startEdit(_len: Lenguaje):void{
    this.lenguajeService.GetLenguaje(_len.idLenguaje).subscribe(
      data => {
        if (data.isSuccess) {
          this.lenguaje = { ...data.result };

          this._modal.afterAllClosed.subscribe(data=> this.ngOnInit() );
          this._modal.open(IdiomModalComponent, {
              autoFocus: false,
              data     : {
                len:  this.lenguaje 
              }
          });
        }
        else {
         //this.onError(data.message);
        }

      },
      error => {
        //this.onError(error.message);
      });
 }


 deleteItem(id:any){

  if(id==0){
   
      return;
   
  }

  var ms=this.translocoService.translate('eTituloUsuarios',{}, 'es');
  // Build the config form
          this.configForm = this._formBuilder.group({
            title      : 'Remove contact',
            message    : 'Are you sure you want to remove this contact permanently? <span class="font-medium">This action cannot be undone!</span>',
            icon       : this._formBuilder.group({
                show : true,
                name : 'heroicons_outline:exclamation',
                color: 'warn'
            }),
            actions    : this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show : true,
                    label: 'Remove',
                    color: 'warn'
                }),
                cancel : this._formBuilder.group({
                    show : true,
                    label: 'Cancel'
                })
            }),
            dismissible: true
        });
      // Open the dialog and save the reference of it
      const dialogRef = this._fuseConfirmationService.open();

      // Subscribe to afterClosed from the dialog reference
      dialogRef.afterClosed().subscribe((result) => {
          console.log(result);
          if(result=="confirmed")
          {
            console.log("Eliminar")
            this.lenguajeService.DelLenguaje(id).subscribe(
              data => {
                if (data.isSuccess) {
                  this.ngOnInit();
                  //this.loadSubMenus(this.selectedMenu);
                  //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Menu Eliminado', life: 3000 });
                }
                else {
                  //this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
                  console.log(data.message)
                }
    
              },
              error => {
                console.log(error.message);
                
              }); 
          }
      });
}



}
