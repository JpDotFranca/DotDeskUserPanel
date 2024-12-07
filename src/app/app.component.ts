import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ChatSideBarComponent } from './chat-sidebar/chat-sidebar.component';
import { IconSidebarComponent } from './icon-sidebar/icon-sidebar.component';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faChartPie,
  faCoffee,
  faComments,
  faHammer,
  faTicket,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    ChatSideBarComponent,
    IconSidebarComponent,
  ],
})
export class AppComponent {
  constructor(private library: FaIconLibrary) {
    // Register the icon(s) you want to use
    this.library.addIcons(
      faCoffee,
      faComments,
      faTicket,
      faUsers,
      faChartPie,
      faHammer
    );
  }

  activeTab = 'abertas';
  userName = 'J France';
  userStatus = 'Disponível';
  userInitials = 'J F';

  // Add methods and properties as needed
}
