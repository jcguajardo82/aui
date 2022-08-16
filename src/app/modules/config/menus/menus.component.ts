import { Component, OnInit ,ViewChild} from '@angular/core';
import { Menu } from 'app/models/menu.model';
import { Subject } from 'rxjs';
import { MenuService } from 'app/services/menu.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MenuModalComponent } from 'app/modules/config/menus/menu-modal/menu-modal.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private menuService:MenuService,private _modal :MatDialog) {
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
          }
          else {
            console.log(data.message);
          }
  
        },
        error => {
          console.log(error);
        
        });

        this.loadSubMenus(1);
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
   
    this.loadSubMenus(2);
  }

  
  /* Add a new note
  */
  addNew(): void
  {
    this._menu =new Menu;
    this._modal.afterAllClosed.subscribe(data=> this.ngOnInit() );
    this._modal.open(MenuModalComponent, {
        autoFocus: false,
        data     : {
            menu: this._menu
        }
    });
  }
  
}
