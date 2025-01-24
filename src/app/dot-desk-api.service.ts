import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import * as signalR from '@microsoft/signalr'

@Injectable({
  providedIn: 'root',
})
export class DotDeskApiService {
  private apiUrl = 'https://localhost:5051/api'
  private hubUrl = 'https://localhost:5051/chat'
  private hubConnection: signalR.HubConnection

  constructor(private http: HttpClient) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl)
      .build()
  }

  startConnection(): void {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err: string) =>
        console.log('Error while starting connection: ' + err)
      )
  }

  addReceiveMessageListener(
    callback: (userId: string, content: string) => void
  ): void {
    this.hubConnection.on('ReceiveMessage', callback)
  }

  sendMessage(room: string, userId: string, content: string): void {
    this.hubConnection
      .invoke('SendMessage', room, userId, content)
      .catch((err: any) => console.error(err))
  }

  joinRoom(room: string): void {
    this.hubConnection
      .invoke('JoinRoom', room)
      .catch((err: any) => console.error(err))
  }

  leaveRoom(room: string): void {
    this.hubConnection
      .invoke('LeaveRoom', room)
      .catch((err: any) => console.error(err))
  }

  getChatMessages(chatId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/Chat/GetChatMessages?chatId=${chatId}`
    )
  }
}
