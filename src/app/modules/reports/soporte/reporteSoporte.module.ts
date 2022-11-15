import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { reporteSoporteComponent } from 'app/modules/reports/soporte/reporteSoporte.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
//import { ppsPasarelaComponent } from '../cotizaciones/masterCotizacion.component';
import { MatListModule } from '@angular/material/list';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: reporteSoporteComponent
    },
    {path: 'pasarela', loadChildren: () => import('app/modules/admin/ppsPasarela/ppsPasarela.module').then(m => m.ppsPasarelaModule)}
    
];



@NgModule({
    
    declarations: [
        reporteSoporteComponent
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
        FuseCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatGridListModule,
        MatTabsModule,
        MatListModule,
          MatTableModule
        
        
    ],
    exports: [
        MatGridListModule
        ]
})
export class reporteSoporteModule
{
    
}

