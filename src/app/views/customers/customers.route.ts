import type { Route } from '@angular/router'
import { DetailsComponent } from './details/details.component'
import { AddComponent } from './add/add.component'

export const CUSTOMER_ROUTES: Route[] = [
  {
    path: 'details',
    component: DetailsComponent,
    data: { title: 'Customer Overview' },
  },
  { path: 'add', component: AddComponent, data: { title: 'Customers Add' } },
]
