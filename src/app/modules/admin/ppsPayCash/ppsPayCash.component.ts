import { Component, ViewEncapsulation } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {PPSService} from  'app/services/pps.service';
import { Order } from 'app/models/pps.Order.model';

export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
    }

@Component({
    selector     : 'payCash',
    templateUrl  : './ppsPayCash.component.html',
    encapsulation: ViewEncapsulation.None
})


export class ppsPayCashComponent
{
    dataSource: MatTableDataSource<any> = new MatTableDataSource();

    mytiles: Tile[] = [
        {text: 'I am one', cols: 3, rows: 1, color: 'lightpink'},
        {text: 'I am two', cols: 1, rows: 2, color: 'grey'},
        {text: 'I am three', cols: 1, rows: 1, color: 'lightblue'},
        {text: 'I am four', cols: 2, rows: 1, color: '#DDBDF1'},
        {text: 'I am five', cols: 4, rows: 1, color: 'red'},
        ];

    configForm: UntypedFormGroup;
    formFieldHelpers: string[] = [''];
    yearlyBilling: boolean = true;
    accountBalanceOptions: ApexOptions;
    data: any;
    users:Order[];
    user:Order;

    /**
     * Constructor
     */
    // constructor()
    // {
        
    // }

    constructor(private ppsService : PPSService,public dialog: MatDialog) {

      
    }
  
    openDialog() {
      const dialogRef = this.dialog.open(DialogContentExampleDialog);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    ngOnInit(): void
    {
        this.user= new Order;
  
        // this.user.orderReferenceNumber=1;
        this.ppsService.getOrdersAll(this.user) .subscribe(
          data => {
            this.users = data.result;
    
            this.dataSource.data = this.users;
          /*  console.log(data.result);
            console.log(data.message); */
          },
          error => {
            console.log(error);
          
          });
        // Build the config form
        // this.configForm = this._formBuilder.group({
        //     title      : 'Remove contact',
        //     message    : 'Are you sure you want to remove this contact permanently? <span class="font-medium">This action cannot be undone!</span>',
        //     icon       : this._formBuilder.group({
        //         show : true,
        //         name : 'heroicons_outline:exclamation',
        //         color: 'warn'
        //     }),
        //     actions    : this._formBuilder.group({
        //         confirm: this._formBuilder.group({
        //             show : true,
        //             label: 'Remove',
        //             color: 'warn'
        //         }),
        //         cancel : this._formBuilder.group({
        //             show : true,
        //             label: 'Cancel'
        //         })
        //     }),
        //     dismissible: true
        // });
    }



}

@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'dialog-content-example-dialog.html',
  })
  
export class DialogContentExampleDialog {}
