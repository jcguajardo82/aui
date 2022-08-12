import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import {UserService} from  'app/services/user.service'
import { User } from 'app/models/user.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',

})
export class UsersComponent implements OnInit {

  @ViewChild('tableList', {read: MatSort}) tableMatSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  tableColumns: string[] = ['id', 'nombre', 'usuario', 'rol', 'activo','actions'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  users:User[];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAll() .subscribe(
      data => {
        this.users = data.result;

        this.dataSource.data = this.users;
       /*  console.log(data.result);
        console.log(data.message); */
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
        

}
