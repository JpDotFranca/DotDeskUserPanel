import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  ViewChild,
  type OnInit,
  type TemplateRef,
} from '@angular/core'
import { DotDeskApiService } from '../../../dot-desk-api.service'
import {
  messages,
  userData,
  type FileType,
  type GroupType,
  type UserType,
} from '../../data'
import { addOrSubtractMinutesFromDate } from '@core/helper/utils'
import { CommonModule, DatePipe } from '@angular/common'
import {
  SimplebarAngularModule,
  type SimplebarAngularComponent,
} from 'simplebar-angular'
import {
  NgbDropdownModule,
  NgbModal,
  NgbOffcanvas,
} from '@ng-bootstrap/ng-bootstrap'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  type UntypedFormGroup,
} from '@angular/forms'
import { ChatProfileComponent } from '../chat-profile/chat-profile.component'
import { ChatSettingComponent } from '../chat-setting/chat-setting.component'
import { ChatLeftSideBarComponent } from '../chat-left-side-bar/chat-left-side-bar.component'

@Component({
  selector: 'chat-area',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    SimplebarAngularModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
  ],
  templateUrl: './chat-area.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatAreaComponent implements OnInit {
  messages: any[] = []
  @Input() profileDetail!: UserType
  formData!: UntypedFormGroup
  submitted = false

  constructor(private dotDeskApiService: DotDeskApiService) {}

  toUser: UserType = {
    id: '112',
    mutualCount: 56,
    name: 'Gilbert Chicoine',
    avatar: 'assets/images/users/avatar-10.jpg',
    email: 'jamesbridge@teleworm.us',
    message: 'Hey! Okay, thank you for letting me know. See you!',
    time: addOrSubtractMinutesFromDate(650),
    contact: '456 9595 9594',
    emailMessage: '',
    location: 'California, USA',
    languages: ['English', 'German', 'Spanish'],
    activityStatus: 'typing',
    status: 'Active',
  }

  public offCanvas = inject(NgbOffcanvas)
  private modalService = inject(NgbModal)
  public formBuilder = inject(UntypedFormBuilder)

  @ViewChild('scrollRef', { static: false })
  scrollRef!: SimplebarAngularComponent

  ngOnInit(): void {
    this.dotDeskApiService.startConnection()
    this.dotDeskApiService.addReceiveMessageListener(
      (userId: string, content: string) => {
        this.messages.push({
          id: (this.messages.length + 1).toString(),
          from:
            userId != this.profileDetail.id ? this.profileDetail : this.toUser,
          to:
            userId == this.profileDetail.id ? this.profileDetail : this.toUser,
          message: { type: 'text', value: content },
          sentOn: new Date(),
        })
        this.scrollToBottom(false)
      }
    )
    this.getChatMessages()
    this.messages = messages.filter(
      (m) =>
        (m.to.id === this.toUser.id && m.from.id === this.profileDetail.id) ||
        (this.toUser.id === m.from.id && m.to.id === this.profileDetail.id)
    )

    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    })
  }

  getChatMessages() {
    this.dotDeskApiService.getChatMessages(15).subscribe(
      (data) => {
        this.messages = data.map((msg) => ({
          id: msg.id,
          from: { id: msg.userId, name: msg.userId }, // Assuming userId is the name for simplicity
          to: this.profileDetail,
          message: { type: 'text', value: msg.content },
          sentOn: new Date(msg.timestamp),
        }))
      },
      (error) => {
        console.error('Error fetching chat messages', error)
      }
    )
  }

  ngAfterViewInit() {
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = 300
    this.scrollToBottom(true)
  }

  scrollToBottom(smooth = true) {
    const self = this
    const scrollElement = this.scrollRef.SimpleBar.getScrollElement()

    if (scrollElement) {
      const maxPosition =
        scrollElement.scrollHeight - scrollElement.clientHeight
      const time = smooth ? 5 : 1 // Adjust the interval time based on smoothness
      const scrollSpeed = 20 // Increase this to control the scroll speed
      let scrollPosition = scrollElement.scrollTop

      const interval = setInterval(function () {
        scrollPosition += scrollSpeed
        scrollElement.scrollTop = scrollPosition

        if (true) {
          clearInterval(interval) // Stop when the bottom is reached
        }
      }, time)
    }
    this.onListScroll()
  }

  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight
      }, 100)
    }
  }

  isFileType(item: any): item is FileType {
    return typeof item === 'object' && ('name' in item || 'preview' in item)
  }

  get form() {
    return this.formData.controls
  }

  messageSend() {
    const message = this.formData.get('message')!.value
    if (this.formData.valid && message) {
      this.dotDeskApiService.sendMessage(
        'general',
        this.profileDetail.id,
        message
      )
      this.formData.reset()
    } else {
      this.submitted = true
    }
    setTimeout(() => {
      this.scrollToBottom(true)
    }, 500)
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'sm', centered: true })
  }

  openProfile() {
    const divElement = document.getElementById('chatArea')!
    const offcanvasRef = this.offCanvas.open(ChatProfileComponent, {
      panelClass: 'position-absolute shadow border-start',
      position: 'end',
      container: divElement,
      backdrop: false,
      scroll: true,
    })
    offcanvasRef.componentInstance.profileDetail = this.profileDetail
  }

  openSidebar() {
    this.offCanvas.open(ChatLeftSideBarComponent)
  }
}
