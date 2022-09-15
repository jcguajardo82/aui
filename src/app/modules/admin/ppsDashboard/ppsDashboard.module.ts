import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ppsDashboardComponent } from 'app/modules/admin/ppsDashboard/ppsDashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ppsDashboardComponent
    }
];

@NgModule({
    declarations: [
        ppsDashboardComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        NgApexchartsModule,
        MatDividerModule,
        MatSortModule,
        MatProgressBarModule,
        SharedModule,
        MatSelectModule
    ]
})
export class DashboardModule
{
}