import { Component, ViewEncapsulation } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector     : 'pps',
    templateUrl  : './ppsDashboard.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ppsDashboardComponent
{
    formFieldHelpers: string[] = [''];
    accountBalanceOptions: ApexOptions;
    data: any;
    /**
     * Constructor
     */
    constructor()
    {
    }
}