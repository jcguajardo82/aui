import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from "@angular/material/chips";
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FuseHighlightModule } from '@fuse/components/highlight';
import { SharedModule } from 'app/shared/shared.module';
import { BotOptionsComponent } from 'app/modules/admin/configuration/bot-options/bot-options.component';

export const routes: Route[] = [
    {
        path     : '',
        component: BotOptionsComponent
    }
];

@NgModule({
    declarations: [
        BotOptionsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatChipsModule,
        MatDialogModule,
        MatIconModule,
        MatStepperModule,
        MatTableModule,
        FuseHighlightModule,
        SharedModule
    ],
    providers:[
      {provide:MAT_DIALOG_DATA, useValue:{}},
      {provide:MatDialogRef, useValue:{}}
    ]
})
export class BotOptionsModule
{
}
