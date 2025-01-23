import type { Route } from '@angular/router'
import { ReviewsComponent } from './apps/reviews/reviews.component'
import { ChatsComponent } from '../chat/chats.component'

export const VIEWS_ROUTES: Route[] = [
  {
    path: '',
    component: ReviewsComponent,
    data: { title: 'Reviews' },
  },
  {
    path: 'chats',
    component: ChatsComponent,
    data: { title: 'Chats' },
  },
]
