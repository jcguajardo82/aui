import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { UsersComponent } from './modules/config/users/users.component';

import { MatTableModule } from '@angular/material/table'

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UserModalComponent } from './modules/config/users/user-modal/user-modal.component';
import { matDialogAnimations, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule } from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {  MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MenusComponent } from './modules/config/menus/menus.component';
import { MenuModalComponent } from './modules/config/menus/menu-modal/menu-modal.component';
import { RolesComponent } from './modules/config/roles/roles/roles.component';
import { RolModalComponent } from './modules/config/roles/rol-modal/rol-modal.component';
import {MatTreeModule} from '@angular/material/tree';
import { NgxsModule } from '@ngxs/store';
import { UserState } from 'state/user.state';

import { TranslocoModule } from '@ngneat/transloco';
import { IdiomComponent } from './modules/config/idiom/idiom.component';
import { IdiomModalComponent } from './modules/config/idiom/idiom-modal/idiom-modal.component';
import { LabelsComponent } from './modules/config/idiom/labels/labels.component';

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        UserModalComponent,
        MenusComponent,
        MenuModalComponent,
        RolesComponent,
        RolModalComponent,
        IdiomComponent,
        IdiomModalComponent,
        LabelsComponent,



    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),

        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        FormsModule,
        MatToolbarModule,
        MatTreeModule,
        TranslocoModule,
        NgxsModule.forRoot([UserState]),

    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
