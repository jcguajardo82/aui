import { Route } from '@angular/router';
import { AnalyticsComponent } from 'app/modules/admin/example/analytics.component';
import { AnalyticsResolver } from 'app/modules/admin/example/analytics.resolvers';

export const analyticsRoutes: Route[] = [
    {
        path     : '',
        component: AnalyticsComponent,
        resolve  : {
            data: AnalyticsResolver
        }
    }
];
