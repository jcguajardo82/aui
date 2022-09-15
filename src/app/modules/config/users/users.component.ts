import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import {UserService} from  'app/services/user.service'
import { User } from 'app/models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { UserModalComponent } from 'app/modules/config/users/user-modal/user-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',

})
export class UsersComponent implements OnInit {

  @ViewChild('tableList', {read: MatSort}) tableMatSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  tableColumns: string[] = ['idUsuario', 'nombre', 'usuario','correo', 'rol', 'activo','actions'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  users:User[];
  user:User;

  constructor(private userService:UserService,
    private _modal :MatDialog
    ) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(
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
     * Add a new note
     */
 addNew(): void
 {
     //this.user = new User;
     this._modal.afterAllClosed.subscribe(data=> this.ngOnInit() );
     this._modal.open(UserModalComponent, {
         autoFocus: false,
         data     : {
             user: new User
         }
     });
 }

 startEdit(_user: User): void
 {
     this.user = new User;
     this._modal.afterAllClosed.subscribe(data=> this.ngOnInit() );
     this._modal.open(UserModalComponent, {
         autoFocus: false,
         data     : {
             user: _user
         }
     });
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
        

}
