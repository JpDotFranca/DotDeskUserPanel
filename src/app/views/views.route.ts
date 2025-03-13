import type { Route } from '@angular/router'
import { ReviewsComponent } from './apps/reviews/reviews.component'
import { ChatsComponent } from '../chat/chats.component'
import { AttenderManagementComponent } from '../attender-management/attender-management.component'

export const VIEWS_ROUTES: Route[] = [
  {
    path: 'attender-management',
    component: AttenderManagementComponent,
    data: { title: 'Usuários' },
  },
  {
    path: 'chats',
    component: ChatsComponent,
    data: { title: 'Chats' },
  },
]
