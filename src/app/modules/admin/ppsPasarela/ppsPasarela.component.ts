import { Component, ViewEncapsulation } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
    }

@Component({
    selector     : 'pasarela',
    templateUrl  : './ppsPasarela.component.html',
    encapsulation: ViewEncapsulation.None
})


export class ppsPasarelaComponent
{
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
    /**
     * Constructor
     */
    // constructor()
    // {
        
    // }

    constructor() {}
  

    ngOnInit(): void
    {
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
