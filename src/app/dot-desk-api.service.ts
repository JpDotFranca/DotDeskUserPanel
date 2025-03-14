import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import * as signalR from '@microsoft/signalr'

@Injectable({
  providedIn: 'root',
})
export class DotDeskApiService {
  private apiBaseUrl_local = 'https://localhost:5051'
  private apiBaseUrl =
    'https://app-dotdesk-api-fbadbfg3g2g2exdm.brazilsouth-01.azurewebsites.net'

  private apiUrl = this.apiBaseUrl + '/api'
  private hubUrl = this.apiBaseUrl + '/chat'
  private hubConnection: signalR.HubConnection

  constructor(private http: HttpClient) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl)
      .build()
  }

  startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started')
        this.joinRoom('general') // Join the room after connection is established
      })
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
