import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  standalone: true,
  styleUrl: './chat-sidebar.component.css',
})
export class ChatSideBarComponent implements OnInit {

  activeTab = 'abertas';
  
  constructor() {}

  ngOnInit(): void {}
  
}
