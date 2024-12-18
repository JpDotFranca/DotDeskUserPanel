import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { ChatLeftSideBarComponent } from './components/chat-left-side-bar/chat-left-side-bar.component'
import { ChatAreaComponent } from './components/chat-area/chat-area.component'
import type { GroupType, UserType } from './data'

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [PageTitleComponent, ChatLeftSideBarComponent, ChatAreaComponent],
  templateUrl: './chats.component.html',
  styles: ``,
})
export class ChatsComponent {
  profileDetail!: UserType

  receiveDataFromChild(data: UserType) {
    this.profileDetail = data
  }
}
