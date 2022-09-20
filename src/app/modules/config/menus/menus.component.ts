import { Component, OnInit ,ViewChild} from '@angular/core';
import { Menu } from 'app/models/menu.model';
import { Subject } from 'rxjs';
import { MenuService } from 'app/services/menu.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MenuModalComponent } from 'app/modules/config/menus/menu-modal/menu-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

class Status {
  label: string;
  val: string;
}

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
})
export class MenusComponent implements OnInit {

  @ViewChild('tableList', {read: MatSort}) tableMatSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  tableColumns: string[] = ['menuId', 'descripcion', 'descripcionCorta', 'url', 'activo','actions'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
 
  status: Status[];
  selectedSatus: string = "false";

  menus: Menu[];
  subMenus: Menu[];
  _menu :Menu;
  selectedMenu:number;
  configForm: UntypedFormGroup;

  constructor(private menuService:MenuService,private _modal :MatDialog,
    private _fuseConfirmationService: FuseConfirmationService,
    private _formBuilder: UntypedFormBuilder,
   ) {
    this.status = [
      { label: 'Activo', val: 'true' },
      { label: 'Inactivo', val: 'false' },
    ];
   }

  ngOnInit(): void {
   
      this.menuService.getMenusPadre().subscribe(
        data => {
          if (data.isSuccess) {
            this.menus = data.result;
            this.onChangeMenu();
          }
          else {
            console.log(data.message);
          }
  
        },
        error => {
          console.log(error);
        
        });

  }

  /**
   * After view init
   */
  ngAfterViewInit(): void
  {
      // Make the data source sortable
      this.dataSource.sort = this.tableMatSort;

      this.dataSource.paginator = this.paginator;
    
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
        

   loadSubMenus(padreId) {
    this.subMenus = null;
    this.menuService.getMenusHijos(padreId).subscribe(
      data => {
        if (data.isSuccess) {
          this.subMenus = data.result;
          this.dataSource.data =this.subMenus;
        }
        else {
          console.log(data.message);
        }

      },
      error => {
        console.log(error);        
      });

  }

  onChangeMenu() {
   
    this.loadSubMenus(this.selectedMenu);
  }

  
  /* Add a new note
  */
  addNew(): void
  {
    this._menu =new Menu;
    if(this.selectedMenu!= undefined){
    this._menu.padreId=this.selectedMenu;
    }
    this._modal.afterAllClosed.subscribe(data=> this.ngOnInit() );
    this._modal.open(MenuModalComponent, {
        autoFocus: false,
        data     : {
            menu: this._menu
        }
    });
  }

    /* Add a new note
  */
    editMenu(): void
    {
      this._menu =new Menu;
     
      this.menuService.getMenu(this.selectedMenu).subscribe(
        data => {
          if (data.isSuccess) {
            //this._menu = { ...data.result };

            this._modal.afterAllClosed.subscribe(data=> this.ngOnInit() );
            this._modal.open(MenuModalComponent, {
                autoFocus: false,
                data     : {
                    menu: { ...data.result }
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

  

  startEdit(_menu: Menu): void
 {
     this._menu = new Menu;
     this._modal.afterAllClosed.subscribe(data=> this.ngOnInit() );
     this._modal.open(MenuModalComponent, {
         autoFocus: false,
         data     : {
             menu: _menu
         }
     });
 }

  deleteItem(id:any){

    if(id==0){
      if(this.selectedMenu == undefined){
        return;
      }

      id=this.selectedMenu;
    }
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
              /* this.menuService.delMenuSub(id).subscribe(
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
                  
                }); */
            }
        });
  }



}
