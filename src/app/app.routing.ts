import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { UsersComponent } from './modules/config/users/users.component';
import { MenusComponent } from './modules/config/menus/menus.component';
import { RolesComponent } from './modules/config/roles/roles/roles.component';
import { LanguagesComponent } from './layout/common/languages/languages.component';
import { IdiomComponent } from './modules/config/idiom/idiom.component';
import { LabelsComponent } from './modules/config/idiom/labels/labels.component';
// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'example'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },

    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
            {path: 'users', component:UsersComponent},
            {path: 'menus', component:MenusComponent},
            {path: 'roles', component:RolesComponent},
            {path: 'idiom', component:IdiomComponent},
            { path: 'labels/:id', component: LabelsComponent },
            
            {path: 'bot', loadChildren: () => import('app/modules/admin/configuration/bot-options/bot-options.module').then(m => m.BotOptionsModule)},
            {path: 'chat', loadChildren: () => import('app/modules/admin/chat/chat.module').then(m => m.ChatModule)},
            {path: 'pps', loadChildren: () => import('app/modules/admin/ppsDashboard/ppsDashboard.module').then(m => m.DashboardModule)},
            {path: 'payCash', loadChildren: () => import('app/modules/admin/ppsPayCash/ppsPayCash.module').then(m => m.ppsPayCashModule)},
            {path: 'pasarela', loadChildren: () => import('app/modules/admin/ppsPasarela/ppsPasarela.module').then(m => m.ppsPasarelaModule)},
            
        ]
    }
];
