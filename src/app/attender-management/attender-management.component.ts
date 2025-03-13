import { CommonModule } from '@angular/common'
import { orderData } from '../../app/views/apps/orders/dat'
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import {
  NgbDropdownModule,
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import { NgxMaskDirective } from 'ngx-mask'

@Component({
  selector: 'app-attender-register',
  standalone: true,
  imports: [
    NgbPaginationModule,
    NgbDropdownModule,
    CommonModule,
    NgbRatingModule,
    NgxMaskDirective,
  ],
  templateUrl: './attender-management.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AttenderManagementComponent {
  orderList = orderData
}
