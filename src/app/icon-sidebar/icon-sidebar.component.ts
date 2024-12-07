import { Component } from '@angular/core';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'icon-sidebar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './icon-sidebar.component.html',
  styleUrl: './icon-sidebar.component.css',
})
export class IconSidebarComponent {
  activeItem = 'comments';

  setActive(section: string) {
    // Update boolean values depending on which section should be active
    this.activeItem = section;
    // ...handle other sections similarly
  }
}
